@echo off
start Launch\launch-git-bash.bat
start "Mongod"/min Launch\launch-database.bat
start "Client"/min Launch\launch-client.bat
start "Server"/min Launch\launch-server.bat
start "Mongo Shell"/min Launch\launch-mongo-shell.bat
start Launch\launch-visual-code.bat
