pipeline {
  agent any

  environment {
    APP_NAME = "payroll-service"
    ENV = "production"
  }

  options {
    timestamps()
    timeout(time: 15, unit: 'MINUTES')
  }

  stages {
    stage('Checkout') {
      steps {
        echo '📥 Checking out source code...'
        checkout scm
      }
    }

    stage('Lint') {
      steps {
        echo '🧹 Running linter...'
        sh 'sleep 1'
      }
    }

    stage('Unit Test') {
      steps {
        echo '🧪 Running unit tests...'
        sh 'sleep 2'
      }
    }

    stage('Security Scan') {
      steps {
        echo '🔒 Running security scans...'
        sh 'sleep 1'
      }
    }

    stage('Build Info') {
      steps {
        echo "📦 App: ${APP_NAME}"
        echo "🌍 Env: ${ENV}"
        echo "🔖 Build ID: ${env.BUILD_ID}"
      }
    }

    stage('Archive') {
      steps {
        echo '🗄️ Archiving build artifacts...'
        sh 'sleep 1'
      }
    }

    stage('Deploy to Staging') {
      steps {
        echo '🚀 Deploying to staging...'
        sh 'sleep 2'
      }
    }

    stage('Approval') {
      steps {
        input message: "Approve to deploy to production?"
      }
    }

    stage('Deploy to Production') {
      steps {
        echo '🚀 Deploying to production...'
        sh 'sleep 2'
      }
    }

    stage('Notify') {
      steps {
        echo '📢 Notifying team of successful deployment...'
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline completed successfully.'
    }
    failure {
      echo '❌ Pipeline failed.'
    }
    always {
      echo '🧹 Cleaning up...'
      deleteDir()
    }
  }
}
