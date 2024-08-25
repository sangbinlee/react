pipeline {
    agent any

    environment {
        // NODE_ENV = 'development'
        // NODE_ENV = 'production'
        BUILD_ID = 'dontKillMe' // Jenkins의 ProcessTreeKiller 방지
        // JENKINS_NODE_COOKIE = 'dontKillMe' // Jenkins의 ProcessTreeKiller 방지
        // PM2_HOME = '/var/lib/jenkins/.pm2'
    }
    stages {
        stage('Clone Sources') {
          steps {
            echo 'react building the application...'
            echo 'by https://jenkins.sodi9.store/github-webhook/'
            echo 'by https://jenkins.sodi9.store/github-webhook/'
            echo 'by https://jenkins.sodi9.store/github-webhook/'
            // git 'https://gitlab.com/chiminyau/ci-test.git'
          }
        }
        stage('Information') {
          steps {
            echo 'react Information...'
            sh 'node -v'
            sh 'npm -v'
          }
        }
        stage('Config') {
          steps {
            echo 'react Config...  now....'
            // sh 'npm set registry https://registry.npm.taobao.org'
            // sh 'npm set disturl https://npm.taobao.org/dist'
            // sh 'npm set chromedriver_cdnurl http://cdn.npm.taobao.org/dist/chromedriver'
            // sh 'npm set operadriver_cdnurl http://cdn.npm.taobao.org/dist/operadriver'
            // sh 'npm set phantomjs_cdnurl http://cdn.npm.taobao.org/dist/phantomjs'
            // sh 'npm set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents'
            // sh 'npm set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass'
            // sh 'npm set electron_mirror http://cdn.npm.taobao.org/dist/electron/'
          }
        }
        stage('Dependencies') {
          steps {
            sh 'npm install'
          }
        }
        // stage('Unit Test') {
        //   steps {
        //     sh 'npm run unit'
        //   }
        // }
        // stage('dev') {
        //   steps {
        //     echo 'react dev the application...  now....'
        //     echo 'react build 시 에러나서 임시로 개발로 배포  now....'
        //     // sh 'npm run dev'
        //     sh 'pm2 restart "react" || pm2 start "npm run dev" --name react'
        //   }
        // }
        stage('Build') {
          steps {
            echo 'react building the application...  now.... 에러 나니까 root 경로를 빌드 dist로 바꾸자'
            echo 'react building the application...  now..../var/lib/jenkins/workspace/react/dist '
            sh 'npm run build'
          }
        }


        stage('run') {
          steps {
            echo 'react building the application...  now....'
            // sh 'npm run dev'
            sh 'pm2 restart "react" || pm2 start "npm run preview" --name react'
          }
        } 







        // stage('deploy') {
        //   steps {
        //     echo 'react deploying the application...  dir /var/www/react'
        //     // sh 'cp dist/* /var/www/react'    
        //     // Permission denied
        //     sh 'sudo rm -rf /var/www/react/*'
        //     sh 'sudo cp -rf dist/* /var/www/react'
        //   }
        // }















        // stage('run') {
        //   steps {
        //     echo 'react building the application...  now....'
        //     // sh 'npm run dev'
        //     sh 'pm2 restart "react" || pm2 start "npm run start" --name react'
        //   }
        // } 
        // stage('test') {
        //     steps {
        //         echo 'react testing the application...'
        //     }
        // }
        // stage('run') {
        //     steps {
        //         echo 'react run the application... by node 명령  important https://jenkins.sodi9.store/github-webhook/'
        //         echo 'react run the application... by 백그라운드 로 실행해야함'
        //         echo 'react run the application... by node .output/server/index.mjs'
        //         // sh 'node .output/server/index.mjs'
        //         // sh 'export BUILD_ID=dontKillMe'
        //         // sh 'pm2 start .output/server/index.mjs -i max --name "react" -f'// 앱이 이전 꺼도 보임 refresh할때마다 다름
        //         sh ' pm2 restart "react" || pm2 start .output/server/index.mjs -i max --name "react"'
        //         sh 'pm2 save'
        //     }
        // }
    }
}
