/// <reference path="_all.d.ts" />

/**
 * Register the router, configs etc here
 */
module myApp {
    "use strict";
    
     var app: angular.IModule = angular.module("myApp", ["ui.router"]);
     
     app.config(Router);
     app.controller("HomeController", HomeCtrl);
}