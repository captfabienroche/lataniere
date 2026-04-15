@echo off
cd /d %~dp0

REM ===== CHECK VERSION =====
if "%1"=="" (
  echo ❌ Usage: release 1.18
  pause
  exit /b
)

set VERSION=v%1

echo ===============================
echo   Release %VERSION%
echo ===============================

echo.
echo 🔹 Ajout fichiers
git add .

REM 🔥 PROTECTION ABSOLUE .ENV
git restore --staged .env 2>nul

echo.
echo 🔹 Commit (si changements)
git diff --cached --quiet || git commit -m "%VERSION% - release"

echo.
echo 🔹 Push
git push

echo.
echo 🔹 Tag
git tag %VERSION% 2>nul
git push origin %VERSION%

echo.
echo 🔹 Version file
echo %VERSION% > version.txt

echo.
echo ✅ Release terminee : %VERSION%
pause