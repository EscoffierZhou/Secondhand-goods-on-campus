@echo off
title Campus Secondhand PC Web
echo ========================================================
echo   Campus Second-hand Trading Platform (PC Web)
echo   Test Account: 20151621029  Password: 666666
echo ========================================================
cd /d "%~dp0pc-web"
if not exist node_modules (
  echo [Info] Installing dependencies, please wait...
  call npm install
)
echo [Info] Starting PC Web development server...
echo [Info] You can open http://localhost:3000 in your browser
call npm run dev
pause
