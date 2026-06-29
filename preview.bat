@echo off
title Todocontenedor - Vista Previa Local
echo ============================================
echo   Todocontenedor - Frontend Preview Server
echo ============================================
echo.

cd /d "%~dp0frontend"

:: Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Iniciando servidor en http://localhost:8080
    echo Presiona Ctrl+C para detener
    echo.
    start http://localhost:8080
    npx -y serve -l 8080 -s .
) else (
    :: Fallback: use Python if available
    where python >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Iniciando servidor en http://localhost:8080
        start http://localhost:8080
        python -m http.server 8080
    ) else (
        echo [!] No se encontro Node.js ni Python.
        echo.
        echo Opciones:
        echo   1. Instala Node.js desde https://nodejs.org
        echo   2. O abre directamente el archivo index.html en Chrome
        echo.
        echo Abriendo index.html directamente...
        start index.html
    )
)

pause
