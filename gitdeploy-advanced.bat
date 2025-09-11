@echo off
setlocal enabledelayedexpansion

echo ========================================
echo POTAATO Restaurant App - Advanced Deploy
echo ========================================
echo.

REM Check if we're in a git repository
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Not in a Git repository
    pause
    exit /b 1
)

REM Get current branch
for /f "tokens=*" %%i in ('git branch --show-current') do set CURRENT_BRANCH=%%i
echo Current branch: !CURRENT_BRANCH!
echo.

REM Check for uncommitted changes
git diff --quiet
if %errorlevel% neq 0 (
    echo WARNING: You have uncommitted changes
    echo.
    set /p COMMIT_MSG="Enter commit message (or press Enter for default): "
    if "!COMMIT_MSG!"=="" set COMMIT_MSG=deploy: manual deployment - %date% %time%
) else (
    echo No changes to commit
    set COMMIT_MSG=deploy: manual deployment - %date% %time%
)

echo.
echo [1/4] Adding all changes to Git...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files to Git
    pause
    exit /b 1
)

echo [2/4] Committing changes...
git commit -m "!COMMIT_MSG!"
if %errorlevel% neq 0 (
    echo ERROR: Failed to commit changes
    pause
    exit /b 1
)

echo [3/4] Pushing to GitHub...
git push origin !CURRENT_BRANCH!
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to GitHub
    pause
    exit /b 1
)

echo [4/4] Deployment complete!
echo.
echo ========================================
echo SUCCESS: Changes pushed to GitHub
echo Branch: !CURRENT_BRANCH!
echo Repository: https://github.com/QuantumClimb/Potaato
echo ========================================
echo.
echo Next steps:
echo 1. Check Vercel dashboard for automatic deployment
echo 2. Verify the app is working on your domain
echo 3. Test the WhatsApp ordering functionality
echo.
pause
