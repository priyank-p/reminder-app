@echo off

:: cd to directory of this file and then to reminder-app.
cd %~dp0
cd ..

:: start pm2
npx.cmd pm2 start app --name reminder-app
