@echo off
title Random Tags
color 0a

echo Verificando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js nao encontrado! Por favor, instale o Node.js.
    echo Acesse: https://nodejs.org/
    pause
    exit
)

echo Instalando dependencias...
call npm install

echo Iniciando o Random Tags...
node "index.js"

pause 
