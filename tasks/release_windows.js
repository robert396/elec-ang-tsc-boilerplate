"use strict";

var Q = require("q");
var gulpUtil = require("gulp-util");
var childProcess = require("child_process");
var jetpack = require("fs-jetpack");
var asar = require("asar");

var projectDir;
var tmpDir;
var releaseDir;
var readyAppDir;
var manifest;

var init = function () {
    gulpUtil.log("Starting Release for Windows...");
    projectDir = jetpack;
    tmpDir = projectDir.cwd("./tmp");
    releaseDir = projectDir.cwd("./releases/windows");
    manifest = projectDir.read("./app/package.json", "json");
    readyAppDir = tmpDir.cwd(manifest.name);
    return Q();
};

var copyRuntime = function () {
    gulpUtil.log("Copying Electron runtime...");
    return projectDir.copyAsync("node_modules/electron-prebuilt/dist", readyAppDir.path(), { overwrite: true });
};

var cleanupRuntime = function () {
    gulpUtil.log("Removing default Electron App...");
    return readyAppDir.removeAsync("resources/default_app");
};

var packageBuiltApp = function () {
    var deferred = Q.defer();
    gulpUtil.log("Packaging the application...");
    asar.createPackage(projectDir.path("build"), readyAppDir.path("resources/app.asar"), function () {
        deferred.resolve();
    });

    return deferred.promise;
};

var finalize = function () {
    var deferred = Q.defer();
    
    projectDir.copy("resources/windows/icon.ico", readyAppDir.path("icon.ico"));

    var rcedit = require("rcedit");
    rcedit(readyAppDir.path("electron.exe"), {
        "icon": projectDir.path("resources/windows/icon.ico"),
        "version-string": {
            "ProductName": manifest.productName,
            "FileDescription": manifest.description
        }
    }, function (err) {
        if (!err) {
            deferred.resolve();
        }
    });

    return deferred.promise;
};

var renameApp = function () {
    return readyAppDir.renameAsync("electron.exe", manifest.productName + ".exe");
};

var createInstaller = function () {
  var deferred = Q.defer();
  gulpUtil.log("Creating Installer...");
  var finalPackage = manifest.name + "_" + manifest.version;
  releaseDir.remove(finalPackage);
  
  gulpUtil.log("Copying from: ", readyAppDir.path(), " To: ", releaseDir.path(finalPackage));
  projectDir.copy(readyAppDir.path(), releaseDir.path(finalPackage));
  
  deferred.resolve();
  return deferred.promise;
};

var cleanClutter = function () {
    gulpUtil.log("Finished creating release.");
    return tmpDir.removeAsync(".");
};

module.exports = function () {
    return init()
        .then(copyRuntime)
        .then(cleanupRuntime)
        .then(packageBuiltApp)
        .then(finalize)
        .then(renameApp)
        .then(createInstaller)
        .then(cleanClutter);
};