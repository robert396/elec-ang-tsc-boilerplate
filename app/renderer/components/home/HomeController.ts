/// <reference path="../../_all.d.ts" />

module MyApp.Controllers {
    "use strict";
    
    export class HomeController  {
        static $inject = ["$scope"];
        
        constructor($scope: ng.IScope) {
            var _self = this;
            
            $scope["getGreeting"] = _self.getGreeting;
        }
        
        public getGreeting(): string {
            return "Hello";
        }
    }
}