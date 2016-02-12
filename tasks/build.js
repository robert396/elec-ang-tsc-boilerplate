"use strict";

var gulp = require("gulp");
var tsc = require("gulp-typescript");
var wiredep = require("wiredep").stream;
var inject = require("gulp-inject");
var angSort = require("gulp-angular-filesort");
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

var injectBower = function () {
    return gulp.src(appDir.path("renderer/index.html"))
        .pipe(wiredep({ cwd: "app" }))
        .pipe(gulp.dest(appDir.path("renderer/")));
}
gulp.task("bower:inject", injectBower);

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
gulp.task("copy:static", ["clean:build", "bower:inject"], copyStaticFiles);

gulp.task("inject", ["copy:static", "tsc:compile"], function () {
    var target = gulp.src([buildDir.path("renderer/index.html")]);
    var sources = gulp.src([
        buildDir.path("renderer/**/*.js")
    ]);
    
    return target.pipe(inject(sources.pipe(angSort()), { relative: true }))
    .pipe(gulp.dest(buildDir.path("renderer/")));
});

gulp.task("build:finalize", ["clean:build"], function () {
    var manifest = appDir.read("package.json", "json");
    buildDir.write("package.json", manifest);
});

gulp.task("build", ["inject", "build:finalize"]);