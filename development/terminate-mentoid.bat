@echo off
echo "Killing all Node servers"
taskkill /f /im node.exe
echo "Shutting down mongoDB server"
mongo admin --eval "db.shutdownServer()"
echo "Klling active Mongo Instance"
taskkill /f /im mongo.exe
echo "Killing Command prompt windows"
taskkill /f /im cmd.exe