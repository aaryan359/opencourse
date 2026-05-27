#!/bin/bash
# Automatically install Docker and Docker Compose on Ubuntu EC2 instance

# Pre-empt interruptions from interactive prompts
export DEBIAN_FRONTEND=noninteractive

# Update system repositories
apt-get update -y
apt-get upgrade -y

# Install absolute baseline prerequisites
apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    software-properties-common

# Add Docker's official GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker package repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine & Command Line Tools
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Enable and start Docker service
systemctl enable docker
systemctl start docker

# Add the default ubuntu SSH user to the docker group
usermod -aG docker ubuntu

# Install standalone Docker Compose binary for compatibility
curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

echo "Docker & Docker Compose installation complete!"
