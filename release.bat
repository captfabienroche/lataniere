@echo off
cd /d %~dp0

set VERSION=v1.17

echo ===============================
echo   Release %VERSION%
echo ===============================

REM 🔥 Sécurité : ne jamais inclure .env
git restore --staged .env 2>nul
git rm --cached -f .env 2>nul

REM 🔥 Ajoute tout sauf .env
git add . ":!.env"

git commit -m "%VERSION% - release"
git push

git tag %VERSION%
git push origin %VERSION%

echo %VERSION% > version.txt

echo.
echo Release terminee : %VERSION%
pause