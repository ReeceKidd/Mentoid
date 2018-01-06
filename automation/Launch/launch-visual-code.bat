@echo off
start "Visual" code -g "C:\Users\User\Desktop\Mentoid"
timeout /t 2 /nobreak
taskkill /F /FI "WindowTitle eq visual" /T
exit