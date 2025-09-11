@echo off
echo ========================================
echo POTAATO Restaurant App - Git Deploy
echo ========================================
echo.

echo [1/4] Adding all changes to Git...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files to Git
    pause
    exit /b 1
)

echo [2/4] Committing changes...
git commit -m "deploy: manual deployment - %date% %time%"
if %errorlevel% neq 0 (
    echo ERROR: Failed to commit changes
    pause
    exit /b 1
)

echo [3/4] Pushing to GitHub...
git push
if %errorlevel% neq 0 (
    echo ERROR: Failed to push to GitHub
    pause
    exit /b 1
)

echo [4/4] Deployment complete!
echo.
echo ========================================
echo SUCCESS: Changes pushed to GitHub
echo Repository: https://github.com/QuantumClimb/Potaato
echo ========================================
echo.
echo Next steps:
echo 1. Check Vercel dashboard for automatic deployment
echo 2. Verify the app is working on your domain
echo.
pause
