provider "aws" {
  region = var.region
}

locals {
  out_dir_name = basename(var.out_dir)
  content_hash = sha1(join("", [for file in fileset(var.out_dir, "**") : filesha1("${var.out_dir}/${file}")]))
}

data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_security_group" "web" {
  name        = "${var.project_name}-sg"
  description = "Allow HTTP and SSH"
  vpc_id      = var.vpc_id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg"
  }
}

resource "aws_instance" "web" {
  ami                         = var.ami_id != "" ? var.ami_id : data.aws_ami.amazon_linux.id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [aws_security_group.web.id]
  key_name                    = var.key_name
  associate_public_ip_address = true

  user_data = <<-EOF_USERDATA
    #!/bin/bash
    set -eux
    dnf update -y
    dnf install -y nginx
    systemctl enable nginx
    systemctl start nginx
    mkdir -p /usr/share/nginx/html
    chown -R ec2-user:ec2-user /usr/share/nginx/html
  EOF_USERDATA

  tags = {
    Name = "${var.project_name}-web"
  }
}

resource "null_resource" "deploy_static" {
  triggers = {
    instance_id  = aws_instance.web.id
    content_hash = local.content_hash
  }

  connection {
    type        = "ssh"
    host        = aws_instance.web.public_ip
    user        = "ec2-user"
    private_key = file(var.private_key_path)
    timeout     = "5m"
  }

  provisioner "file" {
    source      = var.out_dir
    destination = "/tmp/"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo mkdir -p /usr/share/nginx/html",
      "sudo rm -rf /usr/share/nginx/html/*",
      "sudo cp -r /tmp/${local.out_dir_name}/* /usr/share/nginx/html/",
      "sudo chown -R nginx:nginx /usr/share/nginx/html",
      "sudo systemctl restart nginx"
    ]
  }

  depends_on = [aws_instance.web]
}
