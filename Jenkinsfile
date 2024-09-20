@Library('Shared') _
pipeline {
    agent any
    
    // environment{
    //     SONAR_HOME = tool "Sonar"
    // }

    
    stages {
        
        stage("Workspace cleanup"){
            steps{
                script{
                    cleanWs()
                }
            }
        }
        
        stage('Git: Code Checkout') {
            steps {
                script{
                    code_checkout("https://github.com/YeshwanthKare/Jma-hello_world.git","main")
                }
            }
        }
        
        stage("Trivy: Filesystem scan"){
            steps{
                script{
                    trivy_scan()
                }
            }
        }

        stage("OWASP: Dependency check"){
            steps{
                script{
                    owasp_dependency()
                }
            }
        }
        
        
        
        // stage("SonarQube: Code Analysis"){
        //     steps{
        //         script{
        //             sonarqube_analysis("Sonar","Jma-hello_world","Jma-hello_world")
        //         }
        //     }
        // }
        
        // stage("SonarQube: Code Quality Gates"){
        //     steps{
        //         script{
        //             sonarqube_code_quality()
        //             waitForQualityGate(timeout: 10) // Wait for up to 10 minutes for the quality gate status
        //         }
        //     }
        // }
        
        
        stage("Docker: Build Images"){
            steps{
                script{
                        dir('backend'){
                            docker_build("jma-backend-beta","latest","yeshid")
                        }
                    
                        dir('frontend'){
                            docker_build("jma-frontend-beta","latest","yeshid")
                        }
                }
            }
        }
        
        stage("List Files") {
            steps {
                script {
                    sh 'ls -la backend'
                }
            }
        }
        
        stage("Docker: Push to DockerHub"){
            steps{
                script{
                    docker_push("jma-backend-beta","latest","yeshid") 
                    docker_push("jma-frontend-beta","latest","yeshid")
                }
            }
        }
        
        stage('Deploy: Run Containers') {
            steps {
                script {
                    // Stop and remove existing jma-backend and jma-frontend containers if they exist
                    sh '''
                    # Check if jma-backend container exists, stop it, and remove it
                    if [ $(docker ps -aq -f name=jma-backend) ]; then
                        echo "Stopping and removing existing jma-backend container..."
                        docker stop jma-backend || true
                        docker rm jma-backend || true
                    fi
        
                    # Check if jma-frontend container exists, stop it, and remove it
                    if [ $(docker ps -aq -f name=jma-frontend) ]; then
                        echo "Stopping and removing existing jma-frontend container..."
                        docker stop jma-frontend || true
                        docker rm jma-frontend || true
                    fi
                    '''
        
                    // Run the new backend container
                    sh 'docker run -d --name jma-backend -p 3000:3000 yeshid/jma-backend-beta:latest'
        
                    // Run the new frontend container
                    sh 'docker run -d --name jma-frontend -p 80:80 yeshid/jma-frontend-beta:latest'
                }
            }
        }

		stage('Verify Deployment') {
            steps {
                script {
                    sh '''
                    echo "Listing all running containers:"
                    docker ps
                    echo "Inspecting jma-backend container:"
                    docker inspect jma-backend
                    echo "Inspecting jma-frontend container:"
                    docker inspect jma-frontend
                    '''
                }
            }
        }

    }
        
        

    
    post{
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}