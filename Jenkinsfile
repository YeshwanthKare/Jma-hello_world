@Library('Shared') _
pipeline {
    agent any
    
    environment{
        SONAR_HOME = tool "Sonar"
    }

    
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
        
        stage("SonarQube: Code Analysis"){
            steps{
                script{
                    sonarqube_analysis("Sonar","Jma-hello_world","Jma-hello_world")
                }
            }
        }
        
        stage("SonarQube: Code Quality Gates"){
            steps{
                script{
                    sonarqube_code_quality()
					waitForQualityGate(timeout: 10) // Wait for up to 10 minutes for the quality gate status
                }
            }
        }
        
        
        stage("Docker: Build Images"){
            steps{
                script{
                        dir('backend'){
                            docker_build("jma-backend","latest","yeshid")
                        }
                    
                        dir('frontend'){
                            docker_build("jma-frontend","latest","yeshid")
                        }
                }
            }
        }
        
        stage("Docker: Push to DockerHub"){
            steps{
                script{
                    docker_push("jma-backend","latest","yeshid") 
                    docker_push("jma-frontend","latest","yeshid")
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