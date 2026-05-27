variable "aws_region" {
  description = "The AWS Region to deploy all infrastructure into."
  type        = string
  default     = "ap-south-1" # Mumbai (Highly recommended for low latency in India)
}

variable "instance_type" {
  description = "The size of the virtual machine to provision."
  type        = string
  default     = "t3.micro" # 2 vCPUs, 1GB RAM - perfect for learning and low cost
}

variable "key_name" {
  description = "The name of the SSH Key Pair in AWS Console to associate with the EC2 instance. (Make sure you create this key in AWS first!)"
  type        = string
  default     = "opencourse-key"
}
