@echo off
echo ============================================
echo   Starting Vishnu Ice Cream Website Server
echo ============================================
echo.
echo Checking if server is already running...
echo.

netstat -ano | findstr :8000 >nul
if %errorlevel% == 0 (
    echo [SUCCESS] Server is already running on port 8000!
    echo.
    echo Open your browser and visit: http://localhost:8000
    echo.
    pause
    exit
)

echo [INFO] Server is not running. Starting server...
echo.
echo Starting Python HTTP server on port 8000...
echo.
echo IMPORTANT: Keep this window open!
echo Closing this window will stop the server.
echo.
echo Server will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server when done.
echo ============================================
echo.

python -m http.server 8000

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to start server!
    echo.
    echo Make sure Python is installed and in your PATH.
    echo Or try: py -m http.server 8000
    echo.
    pause
)

