/// <reference path="renderer/_all.d.ts" />

"use strict";

var electron = require("electron");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow: Electron.BrowserWindow;

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});


app.on("ready", () => {
   mainWindow = new BrowserWindow({
      height: 600,
      width: 800 
   });
   
   mainWindow.loadURL("file://" + __dirname + "/renderer/index.html");
   
   mainWindow.on("close", () => {
      mainWindow = null; 
   });
});