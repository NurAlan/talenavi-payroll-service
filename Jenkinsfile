pipeline {
  agent any

  environment {
    ENV = "production"
    VERSION = "1.0.0"
  }

  options {
    timestamps()
    timeout(time: 20, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Checking out code...'
        checkout scm
      }
    }

    stage('Lint') {
      steps {
        echo 'Linting code...'
        sh 'sleep 1' // simulasi lint
      }
    }

    stage('Unit Tests') {
      steps {
        echo 'Running unit tests...'
        sh 'sleep 2' // simulasi test
      }
    }

    stage('Build Metadata') {
      steps {
        echo "Environment: ${ENV}"
        echo "Version: ${VERSION}"
        sh 'sleep 1'
      }
    }

    stage('Security Scan') {
      steps {
        echo 'Running security scans...'
        sh 'sleep 1'
      }
    }

    stage('Code Quality') {
      steps {
        echo 'Analyzing code quality...'
        sh 'sleep 1'
      }
    }

    stage('Integration Tests') {
      steps {
        echo 'Running integration tests...'
        sh 'sleep 2'
      }
    }

    stage('Notify QA') {
      steps {
        echo 'Notifying QA team...'
        sh 'sleep 1'
      }
    }

    stage('Prepare Artifact') {
      steps {
        echo 'Packaging artifact...'
        sh 'sleep 1'
      }
    }

    stage('Upload to Staging') {
      steps {
        echo 'Uploading artifact to staging server...'
        sh 'sleep 1'
      }
    }

    stage('Manual Approval') {
      steps {
        input message: "Approve deployment to production?"
      }
    }

    stage('Deploy to Production') {
      steps {
        echo 'Deploying to production...'
        sh 'sleep 2'
      }
    }

    stage('Post-Deploy Tests') {
      steps {
        echo 'Running smoke tests...'
        sh 'sleep 1'
      }
    }

    stage('Notify Team') {
      steps {
        echo 'Sending deployment status to team...'
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed successfully.'
    }
    failure {
      echo 'Pipeline failed.'
    }
    always {
      echo 'Cleaning up workspace...'
      deleteDir()
    }
  }
}
