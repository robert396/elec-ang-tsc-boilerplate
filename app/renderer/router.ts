/// <reference path="_all.d.ts" />

module MyApp {
    "use strict";
    
    export class Router {
        constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            $stateProvider.state("root", {
                url: "/",
                templateUrl: "components/home/_index.html",
                controller: "HomeController",
                controllerAs: "HomeController"
            });
            
            $urlRouterProvider.otherwise("/");
        }
    }
}