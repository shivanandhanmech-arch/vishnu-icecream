@echo off
echo Starting ngrok tunnel...
echo Make sure ngrok.exe is in this folder!
echo.
if exist ngrok.exe (
    ngrok http 8000
) else (
    echo ERROR: ngrok.exe not found!
    echo Please download from https://ngrok.com/download
    echo Extract ngrok.exe to this folder and try again.
    pause
)

