/// <reference path="_all.d.ts" />

module myApp {
    "use strict";
    
    export class Router {
        constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            $stateProvider.state("root", {
                url: "/",
                templateUrl: "areas/home/_index.html",
                controller: "HomeController",
                controllerAs: "homeCtrl"
            });
            
            $urlRouterProvider.otherwise("/");
        }
    }
}