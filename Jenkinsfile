pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'kent250/my-web-app'
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        CONTAINER_NAME = 'my-web-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                // Use WSL to run Unix-style commands
                bat '''
                  wsl docker build -t ${DOCKER_IMAGE}:latest .
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: DOCKER_CREDENTIALS_ID,
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat '''
                      wsl sh -c "echo \\\"$DOCKER_PASS\\\" | docker login -u \\\"$DOCKER_USER\\\" --password-stdin"
                      wsl docker push ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }

        stage('Deploy (Local Host)') {
            steps {
                bat '''
                  wsl docker rm -f ${CONTAINER_NAME} || true
                  wsl docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE}:latest
                '''
            }
        }
    }
}
