pipeline {
    agent any

    environment {
        SONAR_HOST_URL = 'http://your-sonarqube-server'
        SONAR_PROJECT_KEY = 'your-project-key'
        SONAR_PROJECT_NAME = 'Your Project Name'
        SONAR_TOKEN = credentials('sonar-token-id') // Create Jenkins credentials with your Sonar token
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-username/your-repo.git', branch: 'main'
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    sh 'cd frontend && docker build -t your-frontend-image .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    sh 'cd backend && docker build -t your-backend-image .'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    sh """
                    cd frontend
                    mvn sonar:sonar -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_TOKEN}
                    cd ../backend
                    mvn sonar:sonar -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                script {
                    sh 'dependency-check.sh --project "Your Project Name" --scan .'
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                script {
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
