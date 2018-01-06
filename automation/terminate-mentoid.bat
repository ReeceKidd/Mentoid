@echo off
echo "Killing all Node servers"
taskkill /f /im node.exe
echo "Killing MongoDB server"
taskkill /f /im mongod.exe
echo "Klling active Mongo Instance"
taskkill /f /im mongo.exe
echo "Klling active Postman"
taskkill /f /im Postman.exe
echo "Killing Command prompt windows"
taskkill /f /im cmd.exe