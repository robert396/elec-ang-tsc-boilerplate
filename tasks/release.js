"use strict";

var gulp = require("gulp");

var releaseForOs = {
    windows: require("./release_windows")
}

gulp.task("release", ["build"], function () {
   return releaseForOs["windows"]();
});