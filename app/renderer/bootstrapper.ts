/// <reference path="_all.d.ts" />

module MyApp {
    "use strict";
    
     var app: angular.IModule = angular.module("MyApp", ["ui.router"]);
     
     app.config(Router);
     
     wireControllers();
     
     /**
      * Register all Controller classes
      */
     function wireControllers() {
         wire(MyApp.Controllers, app.controller, "Controller");
     }
     
     /**
      * Simulates the registration of objects to the application i.e:
      *
      * app.controller('HomeController', Controllers.HomeController);
      *
      * The Identifier limits the auto registration to only objects that have a constructor that ends in the identifier
      * e.g. Controller makes it so only objects that end in Controller (i.e HomeController) will be registered on the 
      * given registrator.
      * 
      * @param namespace e.g. MyApp.Controllers
      * @param registrator e.g. app.controller
      * @param identifier e.g. Controller
      */
     function wire(namespace: any, registrator: (string, Function) => ng.IModule, identifier?: string) {
         for (var key in namespace) {
             try {                 
                 var injector = namespace[key];
                 
                 if (typeof identifier !== "undefined" && identifier !== null) {
                     var str: string = key.toString();
                     if (str.indexOf(identifier, str.length - identifier.length) === -1) {
                         continue
                     }
                 }                
                 
                 registrator(key, injector);
             } catch (ex) {
                 throw ex;
             }
         }
     }
}