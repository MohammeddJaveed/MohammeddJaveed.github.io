output "instance_id" {
  description = "EC2 instance ID hosting the static website"
  value       = aws_instance.web.id
}

output "public_ip" {
  description = "Public IP of EC2 instance"
  value       = aws_instance.web.public_ip
}

output "website_url" {
  description = "HTTP URL of deployed website"
  value       = "http://${aws_instance.web.public_ip}"
}

output "ssh_command" {
  description = "SSH command for manual access"
  value       = "ssh -i ${var.private_key_path} ec2-user@${aws_instance.web.public_ip}"
}
