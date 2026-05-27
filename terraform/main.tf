terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# 1. Create a Virtual Private Cloud (VPC)
resource "aws_vpc" "opencourse_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "opencourse-vpc"
    Environment = "production"
  }
}

# 2. Create a Public Subnet
resource "aws_subnet" "opencourse_subnet" {
  vpc_id                  = aws_vpc.opencourse_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true # Auto-assign public IP to resources in this subnet

  tags = {
    Name = "opencourse-public-subnet"
  }
}

# 3. Create an Internet Gateway (To allow traffic from internet)
resource "aws_internet_gateway" "opencourse_igw" {
  vpc_id = aws_vpc.opencourse_vpc.id

  tags = {
    Name = "opencourse-igw"
  }
}

# 4. Create a Route Table pointing default routes to Internet Gateway
resource "aws_route_table" "opencourse_route_table" {
  vpc_id = aws_vpc.opencourse_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.opencourse_igw.id
  }

  tags = {
    Name = "opencourse-public-rt"
  }
}

# 5. Associate Route Table with Subnet
resource "aws_route_table_association" "opencourse_rta" {
  subnet_id      = aws_subnet.opencourse_subnet.id
  route_table_id = aws_route_table.opencourse_route_table.id
}

# 6. Create a Security Group (Firewall)
resource "aws_security_group" "opencourse_sg" {
  name        = "opencourse-server-sg"
  description = "Security group for OpenCourse EC2 server hosting the Node.js backend"
  vpc_id      = aws_vpc.opencourse_vpc.id

  # Inbound Rules:
  # Inbound SSH (For GitHub Actions Deployments & local access)
  ingress {
    description = "Allow inbound SSH access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # In production, restrict to your developer IP / GitHub Action IPs
  }

  # Inbound HTTP (Standard Web traffic)
  ingress {
    description = "Allow inbound HTTP access"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Inbound Backend Port (Your Express server's actual port)
  ingress {
    description = "Allow inbound Backend Port access"
    from_port   = 4004
    to_port     = 4004
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound Rules:
  # Allow all outbound traffic so container can fetch DB atlas connection, fetch DockerHub images, run system updates.
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "opencourse-security-group"
  }
}

# 7. Dynamically fetch the latest stable Ubuntu 22.04 LTS AMI image ID
data "aws_ami" "ubuntu_latest" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"] # Canonical (Ubuntu owners) official AWS account ID
}

# 8. Create the EC2 Instance (The VM server)
resource "aws_instance" "opencourse_server" {
  ami                    = data.aws_ami.ubuntu_latest.id
  instance_type          = var.instance_type
  key_name               = var.key_name
  subnet_id              = aws_subnet.opencourse_subnet.id
  vpc_security_group_ids = [aws_security_group.opencourse_sg.id]

  # Load the bash bootstrap script to auto-install Docker & Docker Compose
  user_data = file("${path.module}/scripts/bootstrap.sh")

  # Ensure the public IP is assigned
  associate_public_ip_address = true

  root_block_device {
    volume_size           = 8  # 8 GB Standard size (fits within AWS free-tier!)
    volume_type           = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name        = "opencourse-backend-server"
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}
