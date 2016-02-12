"use strict";

var gulp = require("gulp");
var tsc = require("gulp-typescript");
var jetpack = require("fs-jetpack");
var projectDir = jetpack;
var appDir = projectDir.cwd("./app");
var buildDir = projectDir.cwd("./build");

gulp.task("clean:build", function () {
    return buildDir.dir(".", { empty: true });
});

var compileTypescript = function () {
    var project = tsc.createProject(appDir.path("tsconfig.json"));

    return gulp.src("app/**/*.ts")
        .pipe(tsc(project))
        .pipe(gulp.dest(buildDir.path("")));
};
gulp.task("tsc:compile", ["clean:build"], compileTypescript);

var copyStaticFiles = function () {
  projectDir.copy("app", buildDir.path(), {
     overwrite: true,
     matching: [
         "./node_modules/**",
         "./bower_components/**",
         "./renderer/**/*.html",
     ] 
  });
};
gulp.task("copy:static", ["clean:build"], copyStaticFiles);

gulp.task("build:finalize", ["clean:build"], function () {
   var manifest = appDir.read("package.json", "json");
   buildDir.write("package.json", manifest); 
});

gulp.task("build", ["tsc:compile", "copy:static", "build:finalize"]);