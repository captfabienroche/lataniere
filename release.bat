@echo off
cd /d %~dp0

set VERSION=v1.17

echo ===============================
echo   Release %VERSION%
echo ===============================

git add .
git commit -m "%VERSION% - release"

git push

git tag %VERSION%
git push origin %VERSION%

echo %VERSION% - %date% %time% > version.txt

echo.
echo Release terminee : %VERSION%
pause