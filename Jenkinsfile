pipeline {
    agent any

    // environment {
    //     SONAR_HOST_URL = 'http://54.166.69.79:9000/'
    //     SONAR_PROJECT_KEY = 'Jma-hello_world'
    //     SONAR_PROJECT_NAME = 'Jma-hello_world'
    //     SONAR_TOKEN = credentials('squ_ee04cfb80000d56afb433af9789548e19ab82051') // Jenkins credential with SonarQube token
    // }

    tools {
        maven 'Maven3' // Make sure "Maven3" is configured in Jenkins Global Tool Configuration
    }

    stages {
        // Move the Workspace cleanup stage inside the stages block
        stage('Workspace Cleanup') {
            steps {
                script {
                    cleanWs() // Clean up the workspace
                }
            }
        }

        stage('Checkout') {
            steps {
                git url: 'https://github.com/YeshwanthKare/Jma-hello_world.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                script {
                    def os = System.properties['os.name'].toLowerCase()
                    echo "OS: ${os}"

                    // Run the appropriate build command based on the OS
                    if (os.contains("linux")) {
                        sh "mvn clean install -DskipTests"
                    } else {
                        bat "mvn clean install -DskipTests"
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    sh 'cd frontend && docker build -t jma-frontend .'
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    sh 'cd backend && docker build -t jma-backend .'
                }
            }
        }

        // stage('SonarQube Analysis') {
        //     steps {
        //         script {
        //             // Run SonarQube analysis
        //             sh """
        //             mvn sonar:sonar \
        //                 -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
        //                 -Dsonar.host.url=${SONAR_HOST_URL} \
        //                 -Dsonar.login=${SONAR_TOKEN}
        //             """
        //         }
        //     }
        // }

        stage('OWASP Dependency Check') {
            steps {
                script {
                    // Ensure OWASP dependency check script is available on the agent
                    sh 'dependency-check.sh --project "Jma-hello_world" --scan .'
                }
            }
        }

        stage('Deploy Locally') {
            steps {
                script {
                    // Start the containers using docker-compose
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        // always {
        //     echo 'Cleaning up workspace...'
        //     cleanWs() // Ensure cleanWs is within a node context
        // }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
