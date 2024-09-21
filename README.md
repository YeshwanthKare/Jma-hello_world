CI/CD jenkins Pipeline

Tech stack used in the project

1. Jenkins(CI/CD)

To install Jenkins on an external machine first we need to have "java" pre-installed on our VM or on-prem server

sudo apt-get update

// Docker installation

sudo apt-get install docker.io -y
sudo usermod -aG docker ubuntu && newgrp docker

// Java installation

sudo apt update -y
sudo apt install fontconfig openjdk-17-jre -y

// Jenkins installation

sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
 https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
 https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
 /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt-get update -y
sudo apt-get install jenkins -y

// Install Trivy

sudo apt-get install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update -y
sudo apt-get install trivy -y

// Install and Configure SonarQube

docker run -itd --name SonarQube-Server -p 9000:9000 sonarqube:lts-community

//Jenkins Shared Library

https://github.com/YeshwanthKare/Jenkins_SharedLib

// problems

sudo usermod -aG docker jenkins

sudo systemctl restart jenkins

docker run -d \
 -v /var/run/docker.sock:/var/run/docker.sock \
 -v jenkins_home:/var/jenkins_home \
 jenkins/jenkins:lts

ls -l /var/run/docker.sock

sudo apt-get install docker.io
