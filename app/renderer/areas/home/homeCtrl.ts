/// <reference path="../../_all.d.ts" />

module myApp {
    "use strict";
    
    export class HomeCtrl {
        static $inject = ["$scope"];
        
        constructor($scope: ng.IScope) {
            var self = this;
            
            $scope["getGreeting"] = self.getGreeting;
        }
        
        public getGreeting(): string {
            return "Hello";
        }
    }
}