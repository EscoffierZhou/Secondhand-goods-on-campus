@echo off
chcp 65001 >nul
title 启动校园二手交易平台电脑端 (PC Web)
echo ========================================================
echo   校园二手交易平台 · 电脑端 (PC Web) 正在启动...
echo   技术栈: Vue 3 + Vite + Element Plus + Pinia
echo   预置演示学号: 20151621029 (密码: 666666)
echo ========================================================
cd /d "%~dp0\pc-web"
if not exist node_modules (
  echo 正在首次安装依赖，请稍候...
  call npm install
)
echo 启动开发服务...
call npm run dev
pause
