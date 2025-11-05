@echo off
echo ============================================
echo   Checking Server Status
echo ============================================
echo.

netstat -ano | findstr :8000 >nul
if %errorlevel% == 0 (
    echo [RUNNING] Server is running on port 8000!
    echo.
    echo Open your browser and visit:
    echo   http://localhost:8000
    echo   OR
    echo   http://127.0.0.1:8000
    echo.
    echo To open in browser, press any key...
    pause >nul
    start http://localhost:8000
) else (
    echo [STOPPED] Server is NOT running!
    echo.
    echo To start the server, run: start-server.bat
    echo.
)

echo.
pause

