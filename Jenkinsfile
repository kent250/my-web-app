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
        sh '''
          docker build -t ${DOCKER_IMAGE}:latest .
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
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push ${DOCKER_IMAGE}:latest
          '''
        }
      }
    }

    stage('Deploy (Local Host)') {
      steps {
        sh '''
          docker rm -f ${CONTAINER_NAME} || true
          docker run -d \
            --name ${CONTAINER_NAME} \
            -p 3000:3000 \
            ${DOCKER_IMAGE}:latest
        '''
      }
    }
  }
}
