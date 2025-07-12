pipeline {
    agent any

    stages {
        stage('Declarative: Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Running build...'
                sh 'sleep 2' // simulasi build
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'sleep 1' // simulasi test
            }
        }
        stage('Deliver for development') {
            steps {
                echo 'Delivering to dev...'
            }
        }
        stage('Deploy for production') {
            steps {
                echo 'Deploying to production...'
                sh 'sleep 1'
            }
        }
    }
}
