@echo off
cd /d %~dp0

echo ===============================
echo  LA TANIERE - SERVEUR EMAIL
echo ===============================

IF NOT EXIST node_modules (
  echo Installation des dependances...
  npm install
)

echo.
echo Lancement du serveur...
echo.

node server.js

pause