'use strict';

/**
 * @ngdoc overview
 * @name nodersApp
 * @description
 * # nodersApp
 *
 * Main module of the application.
 */
angular
    .module('nodersApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'ui.router',
        'uiGmapgoogle-maps'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('slack', {
                url: '/slack',
                templateUrl: 'views/slack.html',
                controller: 'SlackCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .state('noders', {
                url: '/noders',
                templateUrl: 'views/noders.html',
                controller: 'NodersCtrl'
            })
            .state('partners', {
                url: '/partners',
                templateUrl: 'views/partners.html',
                controller: 'PartnersCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/auth/login.html',
                controller: 'PartnersCtrl'
            });
    });
