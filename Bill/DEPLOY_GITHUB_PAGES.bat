@echo off
echo ============================================
echo   Deploy to GitHub Pages - Permanent Hosting
echo ============================================
echo.
echo GitHub Pages is 100%% FREE and PERMANENT!
echo.
echo Steps:
echo.
echo 1. Create GitHub Account (if needed):
echo    https://github.com/signup
echo.
echo 2. Create New Repository:
echo    - Click "+" icon ^> "New repository"
echo    - Name: vishnu-icecream
echo    - Make it PUBLIC
echo    - Don't check "Initialize with README"
echo    - Click "Create repository"
echo.
echo 3. Upload Your Files:
echo    - Click "uploading an existing file"
echo    - Drag ALL files from Bill folder:
echo      * index.html
echo      * styles.css
echo      * script.js
echo      * images/ folder (if you have images)
echo    - Click "Commit changes"
echo.
echo 4. Enable GitHub Pages:
echo    - Go to Settings ^> Pages
echo    - Source: "main" branch
echo    - Folder: "/ (root)"
echo    - Click Save
echo    - Wait 1-2 minutes
echo.
echo 5. Get Your Permanent URL:
echo    https://your-username.github.io/vishnu-icecream
echo.
echo ============================================
echo Opening GitHub in your browser...
echo ============================================
timeout /t 3
start https://github.com/new
echo.
pause

