@echo off
echo Starting MongoDB service...
net start MongoDB

echo Starting API server...
cd api
npm start

pause