variable "region" {
  description = "AWS region (for example: eu-west-1)."
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where the EC2 instance will be created."
  type        = string
}

variable "subnet_id" {
  description = "Public subnet ID for the EC2 instance."
  type        = string
}

variable "key_name" {
  description = "Existing EC2 key pair name used for SSH and Terraform provisioners."
  type        = string
}

variable "private_key_path" {
  description = "Path to private key file matching key_name (PEM)."
  type        = string
}

variable "out_dir" {
  description = "Absolute path to Next.js static export directory (out/)."
  type        = string
}

variable "project_name" {
  description = "Name prefix for created AWS resources."
  type        = string
  default     = "portfolio-site"
}

variable "instance_type" {
  description = "EC2 instance type."
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "Optional custom AMI ID. Leave empty to use latest Amazon Linux 2023."
  type        = string
  default     = ""
}

variable "ssh_cidr" {
  description = "CIDR block allowed to SSH into the instance."
  type        = string
  default     = "0.0.0.0/0"
}
