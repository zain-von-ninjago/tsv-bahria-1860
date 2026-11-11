@echo off
title ConvoTech Website
echo Starting ConvoTech website...
cd /d "C:\Users\zaina\Documents\Default Project"

REM Check if server is already running
powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:3000' -TimeoutSec 2 -UseBasicParsing; exit 0 } catch { exit 1 }"
if %errorlevel%==0 goto open

echo Server not running. Starting it now...
start "ConvoTech Server" /min cmd /c "node node_modules\next\dist\bin\next dev --port 3000"

echo Waiting for server to be ready...
powershell -Command "$ready = $false; for ($i = 0; $i -lt 30; $i++) { try { $r = Invoke-WebRequest -Uri 'http://localhost:3000' -TimeoutSec 1 -UseBasicParsing; $ready = $true; break } catch { Start-Sleep -Seconds 1 } }; if ($ready) { exit 0 } else { exit 1 }"

if %errorlevel%==0 (
  echo Server is ready!
) else (
  echo Server took too long to start. Trying anyway...
)

:open
echo Opening browser...
start "" http://localhost:3000
echo Done! The website is open in your browser.
timeout /t 5 >nul
exit