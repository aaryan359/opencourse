output "instance_public_ip" {
  description = "The public IP address of your new EC2 server. Save this for your GitHub Actions Secrets and SSH connections!"
  value       = aws_instance.opencourse_server.public_ip
}

output "instance_public_dns" {
  description = "The public DNS name of your new EC2 server."
  value       = aws_instance.opencourse_server.public_dns
}
