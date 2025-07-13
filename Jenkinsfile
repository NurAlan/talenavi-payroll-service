pipeline {
  agent any

  environment {
    IMAGE_NAME = "testing/testing"
    DOCKER_TAG = "latest"
  }

  options {
    timestamps()
    timeout(time: 20, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        echo '📥 Checking out source code...'
        checkout scmGit(
          branches: [[name: '*/master']],
          extensions: [],
          userRemoteConfigs: [[
            credentialsId: 'github-ssh-key',
            url: 'git@github.com:NurAlan/talenavi-payroll-service.git'
          ]]
        )
      }
    }

    stage('Install Dependencies') {
      steps {
        echo '📦 Installing dependencies...'
        sh 'npm install'
      }
    }

    stage('Build Docker Image') {
      steps {
        echo '🐳 Building Docker image...'
        sh """
          docker build -t ${IMAGE_NAME}:${DOCKER_TAG} .
        """
      }
    }
  }

  post {
    success {
      echo '✅ Build and Docker image creation successful.'
    }
    failure {
      echo '❌ Pipeline failed.'
    }
    always {
      echo '🧹 Cleaning workspace...'
      deleteDir()
    }
  }
}
