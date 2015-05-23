/**
 * INSPINIA - Responsive Admin Theme
 * 2.0
 *
 * Custom scripts
 */

$(document).ready(function () {


    // Full height
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if(navbarHeigh > wrapperHeigh){
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh){
            $('#page-wrapper').css("min-height", $(window).height()  + "px");
        }
    }

    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    })

    setTimeout(function(){
        fix_height();
    })
});

// Minimalize menu when screen is less than 768px
$(function() {
    $(window).bind("load resize", function() {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    })
});

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
        'NodersAPI',
        'uiGmapgoogle-maps'
    ])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
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
                controller: 'AuthCtrl'
            })
            .state('perfil', {
                url: '/perfil',
                templateUrl: 'views/auth/perfil.html',
                controller: 'AuthCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/auth/register.html',
                controller: 'AuthCtrl'
            });
    }]).run(["$rootScope", "$state", function($rootScope, $state) {
        $rootScope.$state = $state;
    }]);

'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
    .controller('MainCtrl', ['$scope', '$http', 'uiGmapGoogleMapApi', function($scope, $http, uiGmapGoogleMapApi) {
        $scope.awesomeThings = [];
        $scope.map = {};
        $scope.map.center = {
            latitude: -16.0,
            longitude: -70.0
        };

        $scope.map.zoom = 3;
        $http.get('http://api.noders.com/api/partners')
            .success(function(partners) {
                $scope.partners = partners;
            });

        $http.get('http://api.noders.com/api/noders')
            .success(function(noders) {
                $scope.noders = noders;
            });
        $http.get('http://api.noders.com/api/eventos')
            .success(function(eventos) {
                $scope.eventos = eventos;
            });

        uiGmapGoogleMapApi.then(function(maps) {

            $http.get('http://api.noders.com/api/Hosts')
                .success(function(hosts) {

                    var comunidades = [];
                    _.each(hosts, function(noder, i) {
                        var ob = {};
                        ob.id = noder.id;
                        ob.latitude = noder.geo.lat;
                        ob.longitude = noder.geo.lng;
                        ob.title = noder.name;
                        comunidades.push(ob);
                    });
                    $scope.map.comunidades = comunidades;
                });

        });

        $scope.noderClicked = function(marker) {
            $scope.selectedMarker = null;
            $scope.selectedMarker = marker;
        };





        $scope.map.options = {};
        $scope.map.options.styless = [{
            'featureType': 'water',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#d3d3d3'
            }]
        }, {
            'featureType': 'transit',
            'stylers': [{
                'color': '#808080'
            }, {
                'visibility': 'off'
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#b3b3b3'
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#ffffff'
            }]
        }, {
            'featureType': 'road.local',
            'elementType': 'geometry.fill',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#ffffff'
            }, {
                'weight': 1.8
            }]
        }, {
            'featureType': 'road.local',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'color': '#d7d7d7'
            }]
        }, {
            'featureType': 'poi',
            'elementType': 'geometry.fill',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#ebebeb'
            }]
        }, {
            'featureType': 'administrative',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#a7a7a7'
            }]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#ffffff'
            }]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#ffffff'
            }]
        }, {
            'featureType': 'landscape',
            'elementType': 'geometry.fill',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#efefef'
            }]
        }, {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'color': '#696969'
            }]
        }, {
            'featureType': 'administrative',
            'elementType': 'labels.text.fill',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#737373'
            }]
        }, {
            'featureType': 'poi',
            'elementType': 'labels.icon',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'poi',
            'elementType': 'labels',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'color': '#d6d6d6'
            }]
        }, {
            'featureType': 'road',
            'elementType': 'labels.icon',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {}, {
            'featureType': 'poi',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#dadada'
            }]
        }];


    }]);

'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
  .controller('AboutCtrl', ["$scope", function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:SlackCtrl
 * @description
 * # SlackCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
  .controller('SlackCtrl', ["$scope", function ($scope) {
    $scope.suscribir = function(){
    	$scope.email='';
    };
  }]);
'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:NodersCtrl
 * @description
 * # NodersCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
    .controller('NodersCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('http://api.noders.com/api/noders')
            .success(function(noders) {
                $scope.noders = noders;
            });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:PartnersCtrl
 * @description
 * # PartnersCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
  .controller('PartnersCtrl', ['$scope', '$http', function($scope, $http) {
        $http.get('http://api.noders.com/api/partners')
            .success(function(partners) {
                $scope.partners = partners;
            });
    }]);

'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
    .controller('AuthCtrl', ["$scope", "$location", "Noder", "LoopBackAuth", function($scope,$location, Noder, LoopBackAuth) {
        $scope.auth = LoopBackAuth;
        //* auth.currentUserId **/
        $scope.error = {}
        $scope.logout = function() {
            Noder.logout().$promise.then(function(data) {
                $location.path('/')
            })
        }
        $scope.login = function() {
            Noder.login({
                username: $scope.username,
                password: $scope.password
            }, function(data) {
                $location.path('/')
            }, function(data) {
                if (data.data.error.code == "LOGIN_FAILED") {
                    $scope.error.notfound = true;
                }
            })
        }
    }]);

'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:CoreCtrl
 * @description
 * # CoreCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
    .controller('CoreCtrl', ["$scope", "LoopBackAuth", "$location", "Noder", function($scope, LoopBackAuth, $location, Noder) {
        /* Re-generar la informacion del usuario cuando reinicio el server */
        $scope.checkUserState = function(){
            if(LoopBackAuth.currentUserId){
                return "logged"
            }else{
                return "not-logged"
            }
        }
        if (LoopBackAuth.currentUserId) {
            Noder.findById({'id':LoopBackAuth.currentUserId}, function(data) {
                LoopBackAuth.currentUserData = data
            })
        }
        if ($location.$$path != '/') {
            if (!LoopBackAuth.currentUserId) {
                $location.path('/login');
            } else {
                //$location.path('/')
            }
        }
    }]);

'use strict';

/**
 * @ngdoc service
 * @name nodersApp.auth
 * @description
 * # auth
 * Service in the nodersApp.
 */
angular.module('nodersApp')
    .factory('Auth', ["$cookies", "Noders", "LoopBackAuth", "$http", function($cookies, Noders, LoopBackAuth, $http) {
        return {
            login: function(data, cb) {
                var self = this;
                LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
                $http.post('/api/noders/login?include=user', {
                        email: data.email,
                        password: data.password
                    })
                    .then(function(response) {
                        if (response.data && response.data.id) {
                            LoopBackAuth.currentUserId = response.data.userId;
                            LoopBackAuth.accessTokenId = response.data.id;
                        }
                        if (LoopBackAuth.currentUserId === null) {
                            delete $cookies['access_token'];
                            LoopBackAuth.accessTokenId = null;
                        }
                        LoopBackAuth.save();
                        if (LoopBackAuth.currentUserId && response.data && response.data
                            .user) {
                            self.currentUser = response.data.user;
                            cb(self.currentUser);

                        } else {
                            cb({});
                        }
                    }, function() {
                        console.log('User.login() err', arguments);
                        LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId =
                            null;
                        LoopBackAuth.save();
                        cb({});
                    });
            },

            logout: function() {
                LoopBackAuth.clearUser();
                LoopBackAuth.save();
                window.location = '/auth/logout';
            },

            ensureHasCurrentUser: function(cb) {
                var self = this;
                if ((!this.currentUser || this.currentUser.id === 'social') &&
                    $cookies.access_token) {
                    LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId = null;
                    $http.get('/auth/current')
                        .then(function(response) {
                            if (response.data.id) {
                                LoopBackAuth.currentUserId = response.data.id;
                                LoopBackAuth.accessTokenId = $cookies.access_token.substring(
                                    2, 66);
                            }
                            if (LoopBackAuth.currentUserId === null) {
                                delete $cookies['access_token'];
                                LoopBackAuth.accessTokenId = null;
                            }
                            LoopBackAuth.save();
                            self.currentUser = response.data;
                            var profile = self.currentUser && self.currentUser.profiles &&
                                self.currentUser.profiles.length && self.currentUser.profiles[
                                    0];
                            if (profile) {
                                self.currentUser.name = profile.profile.name;
                            }
                            cb(self.currentUser);
                        }, function() {
                            console.log('User.getCurrent() err', arguments);
                            LoopBackAuth.currentUserId = LoopBackAuth.accessTokenId =
                                null;
                            LoopBackAuth.save();
                            cb({});
                        });
                } else {
                    console.log('Using cached current user.');
                    cb(self.currentUser);
                }
            }
        };
    }]);

/**
 * INSPINIA - Responsive Admin Theme
 * Copyright 2015 Webapplayers.com
 *
 */


/**
 * pageTitle - Directive for set Page title - mata title
 */
angular
    .module('nodersApp')
    .directive('pageTitle', ["$rootScope", "$timeout", function pageTitle($rootScope, $timeout) {
        return {
            link: function(scope, element) {
                var listener = function(event, toState, toParams, fromState, fromParams) {
                    // Default title - load on Dashboard 1
                    var title = 'INSPINIA | Responsive Admin Theme';
                    // Create your own title pattern
                    if (toState.data && toState.data.pageTitle) title = 'INSPINIA | ' + toState.data.pageTitle;
                    $timeout(function() {
                        element.text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        }
    }]);
/**
 * sideNavigation - Directive for run metsiMenu on sidebar navigation
 */
angular
    .module('nodersApp')
    .directive('sideNavigation', ["$timeout", function sideNavigation($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function() {
                    element.metisMenu();
                });
            }
        };
    }]);
/**
 * iboxTools - Directive for iBox tools elements in right corner of ibox
 */
angular
    .module('nodersApp')
    .directive('iboxTools', ["$timeout", function iboxTools($timeout) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'views/common/ibox_tools.html',
            controller: ["$scope", "$element", function($scope, $element) {
                // Function for collapse ibox
                $scope.showhide = function() {
                        var ibox = $element.closest('div.ibox');
                        var icon = $element.find('i:first');
                        var content = ibox.find('div.ibox-content');
                        content.slideToggle(200);
                        // Toggle icon from up to down
                        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                        ibox.toggleClass('').toggleClass('border-bottom');
                        $timeout(function() {
                            ibox.resize();
                            ibox.find('[id^=map-]').resize();
                        }, 50);
                    },
                    // Function for close ibox
                    $scope.closebox = function() {
                        var ibox = $element.closest('div.ibox');
                        ibox.remove();
                    }
            }]
        };
    }]);
/**
 * minimalizaSidebar - Directive for minimalize sidebar
 */
angular
    .module('nodersApp')
    .directive('minimalizaSidebar', ["$timeout", function minimalizaSidebar($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()" style="padding-top: 4px; padding-bottom: 2px;"><i class="icon-noders" style="font-size: 20px;"></i></a>',
            controller: ["$scope", "$element", "LoopBackAuth", function($scope, $element, LoopBackAuth) {
                $scope.minimalize = function() {
                    if (LoopBackAuth.currentUserId) {
                        $("body").toggleClass("mini-navbar");
                        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                            // Hide menu in order to smoothly turn on when maximize menu
                            $('#side-menu').hide();
                            // For smoothly turn on menu
                            setTimeout(
                                function() {
                                    $('#side-menu').fadeIn(500);
                                }, 100);
                        } else if ($('body').hasClass('fixed-sidebar')) {
                            $('#side-menu').hide();
                            setTimeout(
                                function() {
                                    $('#side-menu').fadeIn(500);
                                }, 300);
                        } else {
                            // Remove all inline style from jquery fadeIn function to reset menu state
                            $('#side-menu').removeAttr('style');
                        }
                    }
                }
            }]
        };
    }]);

(function(window, angular, undefined) {'use strict';

var urlBase = "http://localhost:3003/api";
//var urlBase = "http://api.noders.com/api";
var authHeader = 'authorization';

/**
 * @ngdoc overview
 * @name NodersAPI
 * @module
 * @description
 *
 * The `NodersAPI` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("NodersAPI", ['ngResource']);

/**
 * @ngdoc object
 * @name NodersAPI.Noder
 * @header NodersAPI.Noder
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Noder` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Noder",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Noders/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$__findById__accessTokens
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          url: urlBase + "/Noders/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$__destroyById__accessTokens
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          url: urlBase + "/Noders/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$__updateById__accessTokens
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          url: urlBase + "/Noders/:id/accessTokens/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.host() instead.
        "prototype$__get__host": {
          url: urlBase + "/Noders/:id/host",
          method: "GET"
        },

        // INTERNAL. Use Noder.sigue.findById() instead.
        "prototype$__findById__sigue": {
          url: urlBase + "/Noders/:id/sigue/:fk",
          method: "GET"
        },

        // INTERNAL. Use Noder.sigue.destroyById() instead.
        "prototype$__destroyById__sigue": {
          url: urlBase + "/Noders/:id/sigue/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.sigue.updateById() instead.
        "prototype$__updateById__sigue": {
          url: urlBase + "/Noders/:id/sigue/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.sigue.link() instead.
        "prototype$__link__sigue": {
          url: urlBase + "/Noders/:id/sigue/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.sigue.unlink() instead.
        "prototype$__unlink__sigue": {
          url: urlBase + "/Noders/:id/sigue/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.sigue.exists() instead.
        "prototype$__exists__sigue": {
          url: urlBase + "/Noders/:id/sigue/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Noder.suscrito.findById() instead.
        "prototype$__findById__suscrito": {
          url: urlBase + "/Noders/:id/suscrito/:fk",
          method: "GET"
        },

        // INTERNAL. Use Noder.suscrito.destroyById() instead.
        "prototype$__destroyById__suscrito": {
          url: urlBase + "/Noders/:id/suscrito/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.suscrito.updateById() instead.
        "prototype$__updateById__suscrito": {
          url: urlBase + "/Noders/:id/suscrito/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.suscrito.link() instead.
        "prototype$__link__suscrito": {
          url: urlBase + "/Noders/:id/suscrito/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.suscrito.unlink() instead.
        "prototype$__unlink__suscrito": {
          url: urlBase + "/Noders/:id/suscrito/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.suscrito.exists() instead.
        "prototype$__exists__suscrito": {
          url: urlBase + "/Noders/:id/suscrito/rel/:fk",
          method: "HEAD"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$__get__accessTokens
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Queries accessTokens of Noder.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/Noders/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$__create__accessTokens
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Reºquest parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/Noders/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$__delete__accessTokens
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/Noders/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$__count__accessTokens
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Counts accessTokens of Noder.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/Noders/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use Noder.sigue() instead.
        "prototype$__get__sigue": {
          isArray: true,
          url: urlBase + "/Noders/:id/sigue",
          method: "GET"
        },

        // INTERNAL. Use Noder.sigue.create() instead.
        "prototype$__create__sigue": {
          url: urlBase + "/Noders/:id/sigue",
          method: "POST"
        },

        // INTERNAL. Use Noder.sigue.destroyAll() instead.
        "prototype$__delete__sigue": {
          url: urlBase + "/Noders/:id/sigue",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.sigue.count() instead.
        "prototype$__count__sigue": {
          url: urlBase + "/Noders/:id/sigue/count",
          method: "GET"
        },

        // INTERNAL. Use Noder.suscrito() instead.
        "prototype$__get__suscrito": {
          isArray: true,
          url: urlBase + "/Noders/:id/suscrito",
          method: "GET"
        },

        // INTERNAL. Use Noder.suscrito.create() instead.
        "prototype$__create__suscrito": {
          url: urlBase + "/Noders/:id/suscrito",
          method: "POST"
        },

        // INTERNAL. Use Noder.suscrito.destroyAll() instead.
        "prototype$__delete__suscrito": {
          url: urlBase + "/Noders/:id/suscrito",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.suscrito.count() instead.
        "prototype$__count__suscrito": {
          url: urlBase + "/Noders/:id/suscrito/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#create
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Noders",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#upsert
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Noders",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#exists
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Noders/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#findById
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Noders/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#find
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Noders",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#findOne
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Noders/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#updateAll
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Noders/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#deleteById
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Noders/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#count
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Noders/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$updateAttributes
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Noders/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#login
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         * 
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         * 
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/Noders/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#logout
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Logout a user with access token
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/Noders/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#confirm
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Confirm a user registration with email verification token
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` - 
         *
         *  - `token` – `{string}` - 
         *
         *  - `redirect` – `{string=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/Noders/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#resetPassword
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Reset password for a user with email
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/Noders/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#prototype$volverAdmin
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * <em>
         * (The remote method definition does not provide any description.)
         * </em>
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method does not accept any data. Supply an empty object.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `solution` – `{string=}` - 
         */
        "prototype$volverAdmin": {
          url: urlBase + "/Noders/:id/volverAdmin",
          method: "POST"
        },

        // INTERNAL. Use Comunidad.noders.findById() instead.
        "::findById::Comunidad::noders": {
          url: urlBase + "/Comunidades/:id/noders/:fk",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.noders.destroyById() instead.
        "::destroyById::Comunidad::noders": {
          url: urlBase + "/Comunidades/:id/noders/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.noders.updateById() instead.
        "::updateById::Comunidad::noders": {
          url: urlBase + "/Comunidades/:id/noders/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Comunidad.seguidores.findById() instead.
        "::findById::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/:fk",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.seguidores.destroyById() instead.
        "::destroyById::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.seguidores.updateById() instead.
        "::updateById::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Comunidad.seguidores.link() instead.
        "::link::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Comunidad.seguidores.unlink() instead.
        "::unlink::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.seguidores.exists() instead.
        "::exists::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Comunidad.noders() instead.
        "::get::Comunidad::noders": {
          isArray: true,
          url: urlBase + "/Comunidades/:id/noders",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.noders.create() instead.
        "::create::Comunidad::noders": {
          url: urlBase + "/Comunidades/:id/noders",
          method: "POST"
        },

        // INTERNAL. Use Comunidad.noders.destroyAll() instead.
        "::delete::Comunidad::noders": {
          url: urlBase + "/Comunidades/:id/noders",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.noders.count() instead.
        "::count::Comunidad::noders": {
          url: urlBase + "/Comunidades/:id/noders/count",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.seguidores() instead.
        "::get::Comunidad::seguidores": {
          isArray: true,
          url: urlBase + "/Comunidades/:id/seguidores",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.seguidores.create() instead.
        "::create::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores",
          method: "POST"
        },

        // INTERNAL. Use Comunidad.seguidores.destroyAll() instead.
        "::delete::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.seguidores.count() instead.
        "::count::Comunidad::seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/count",
          method: "GET"
        },

        // INTERNAL. Use Evento.suscritos.findById() instead.
        "::findById::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/:fk",
          method: "GET"
        },

        // INTERNAL. Use Evento.suscritos.destroyById() instead.
        "::destroyById::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Evento.suscritos.updateById() instead.
        "::updateById::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Evento.suscritos.link() instead.
        "::link::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Evento.suscritos.unlink() instead.
        "::unlink::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Evento.suscritos.exists() instead.
        "::exists::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Evento.suscritos() instead.
        "::get::Evento::suscritos": {
          isArray: true,
          url: urlBase + "/Eventos/:id/suscritos",
          method: "GET"
        },

        // INTERNAL. Use Evento.suscritos.create() instead.
        "::create::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos",
          method: "POST"
        },

        // INTERNAL. Use Evento.suscritos.destroyAll() instead.
        "::delete::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos",
          method: "DELETE"
        },

        // INTERNAL. Use Evento.suscritos.count() instead.
        "::count::Evento::suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#getCurrent
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/Noders" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            },
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__ : true
        }
      }
    );



        /**
         * @ngdoc method
         * @name NodersAPI.Noder#updateOrCreate
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#update
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#destroyById
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#removeById
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#getCachedCurrent
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link NodersAPI.Noder#login} or
         * {@link NodersAPI.Noder#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Noder instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#isAuthenticated
         * @methodOf NodersAPI.Noder
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder#getCurrentId
         * @methodOf NodersAPI.Noder
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name NodersAPI.Noder#modelName
    * @propertyOf NodersAPI.Noder
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Noder`.
    */
    R.modelName = "Noder";


        /**
         * @ngdoc method
         * @name NodersAPI.Noder#host
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Fetches belongsTo relation host.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` - 
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        R.host = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::get::Noder::host"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Noder.sigue
     * @header lbServices.Noder.sigue
     * @object
     * @description
     *
     * The object `Noder.sigue` groups methods
     * manipulating `Comunidad` instances related to `Noder`.
     *
     * Call {@link lbServices.Noder#sigue Noder.sigue()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name NodersAPI.Noder#sigue
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Queries sigue of Noder.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        R.sigue = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::get::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#count
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Counts sigue of Noder.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.sigue.count = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::count::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#create
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Creates a new instance in sigue of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        R.sigue.create = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::create::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#destroyAll
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Deletes all sigue of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.sigue.destroyAll = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::delete::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#destroyById
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Delete a related item by id for sigue.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for sigue
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.sigue.destroyById = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::destroyById::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#exists
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Check the existence of sigue relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for sigue
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        R.sigue.exists = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::exists::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#findById
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Find a related item by id for sigue.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for sigue
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        R.sigue.findById = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::findById::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#link
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Add a related item by id for sigue.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for sigue
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        R.sigue.link = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::link::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#unlink
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Remove the sigue relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for sigue
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.sigue.unlink = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::unlink::Noder::sigue"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.sigue#updateById
         * @methodOf NodersAPI.Noder.sigue
         *
         * @description
         *
         * Update a related item by id for sigue.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for sigue
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        R.sigue.updateById = function() {
          var TargetResource = $injector.get("Comunidad");
          var action = TargetResource["::updateById::Noder::sigue"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Noder.suscrito
     * @header lbServices.Noder.suscrito
     * @object
     * @description
     *
     * The object `Noder.suscrito` groups methods
     * manipulating `Evento` instances related to `Noder`.
     *
     * Call {@link lbServices.Noder#suscrito Noder.suscrito()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name NodersAPI.Noder#suscrito
         * @methodOf NodersAPI.Noder
         *
         * @description
         *
         * Queries suscrito of Noder.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.suscrito = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::get::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#count
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Counts suscrito of Noder.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.suscrito.count = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::count::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#create
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Creates a new instance in suscrito of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.suscrito.create = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::create::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#destroyAll
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Deletes all suscrito of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.suscrito.destroyAll = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::delete::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#destroyById
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Delete a related item by id for suscrito.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for suscrito
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.suscrito.destroyById = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::destroyById::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#exists
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Check the existence of suscrito relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for suscrito
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.suscrito.exists = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::exists::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#findById
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Find a related item by id for suscrito.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for suscrito
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.suscrito.findById = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::findById::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#link
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Add a related item by id for suscrito.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for suscrito
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.suscrito.link = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::link::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#unlink
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Remove the suscrito relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for suscrito
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.suscrito.unlink = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::unlink::Noder::suscrito"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Noder.suscrito#updateById
         * @methodOf NodersAPI.Noder.suscrito
         *
         * @description
         *
         * Update a related item by id for suscrito.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for suscrito
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.suscrito.updateById = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::updateById::Noder::suscrito"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name NodersAPI.Partner
 * @header NodersAPI.Partner
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Partner` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Partner",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Partners/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#create
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Partner` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Partners",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#upsert
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Partner` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Partners",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#exists
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Partners/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#findById
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Partner` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Partners/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#find
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Partner` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Partners",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#findOne
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Partner` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Partners/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#updateAll
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Partners/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#deleteById
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Partners/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#count
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Partners/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#prototype$updateAttributes
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Partner` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Partners/:id",
          method: "PUT"
        },
      }
    );



        /**
         * @ngdoc method
         * @name NodersAPI.Partner#updateOrCreate
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Partner` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#update
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#destroyById
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name NodersAPI.Partner#removeById
         * @methodOf NodersAPI.Partner
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name NodersAPI.Partner#modelName
    * @propertyOf NodersAPI.Partner
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Partner`.
    */
    R.modelName = "Partner";


    return R;
  }]);

/**
 * @ngdoc object
 * @name NodersAPI.Comunidad
 * @header NodersAPI.Comunidad
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Comunidad` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Comunidad",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Comunidades/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Comunidad.noders.findById() instead.
        "prototype$__findById__noders": {
          url: urlBase + "/Comunidades/:id/noders/:fk",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.noders.destroyById() instead.
        "prototype$__destroyById__noders": {
          url: urlBase + "/Comunidades/:id/noders/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.noders.updateById() instead.
        "prototype$__updateById__noders": {
          url: urlBase + "/Comunidades/:id/noders/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Comunidad.eventos.findById() instead.
        "prototype$__findById__eventos": {
          url: urlBase + "/Comunidades/:id/eventos/:fk",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.eventos.destroyById() instead.
        "prototype$__destroyById__eventos": {
          url: urlBase + "/Comunidades/:id/eventos/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.eventos.updateById() instead.
        "prototype$__updateById__eventos": {
          url: urlBase + "/Comunidades/:id/eventos/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Comunidad.seguidores.findById() instead.
        "prototype$__findById__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/:fk",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.seguidores.destroyById() instead.
        "prototype$__destroyById__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.seguidores.updateById() instead.
        "prototype$__updateById__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Comunidad.seguidores.link() instead.
        "prototype$__link__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Comunidad.seguidores.unlink() instead.
        "prototype$__unlink__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.seguidores.exists() instead.
        "prototype$__exists__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Comunidad.noders() instead.
        "prototype$__get__noders": {
          isArray: true,
          url: urlBase + "/Comunidades/:id/noders",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.noders.create() instead.
        "prototype$__create__noders": {
          url: urlBase + "/Comunidades/:id/noders",
          method: "POST"
        },

        // INTERNAL. Use Comunidad.noders.destroyAll() instead.
        "prototype$__delete__noders": {
          url: urlBase + "/Comunidades/:id/noders",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.noders.count() instead.
        "prototype$__count__noders": {
          url: urlBase + "/Comunidades/:id/noders/count",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.eventos() instead.
        "prototype$__get__eventos": {
          isArray: true,
          url: urlBase + "/Comunidades/:id/eventos",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.eventos.create() instead.
        "prototype$__create__eventos": {
          url: urlBase + "/Comunidades/:id/eventos",
          method: "POST"
        },

        // INTERNAL. Use Comunidad.eventos.destroyAll() instead.
        "prototype$__delete__eventos": {
          url: urlBase + "/Comunidades/:id/eventos",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.eventos.count() instead.
        "prototype$__count__eventos": {
          url: urlBase + "/Comunidades/:id/eventos/count",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.seguidores() instead.
        "prototype$__get__seguidores": {
          isArray: true,
          url: urlBase + "/Comunidades/:id/seguidores",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.seguidores.create() instead.
        "prototype$__create__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores",
          method: "POST"
        },

        // INTERNAL. Use Comunidad.seguidores.destroyAll() instead.
        "prototype$__delete__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.seguidores.count() instead.
        "prototype$__count__seguidores": {
          url: urlBase + "/Comunidades/:id/seguidores/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#create
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Comunidades",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#upsert
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Comunidades",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#exists
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Comunidades/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#findById
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Comunidades/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#find
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Comunidades",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#findOne
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Comunidades/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#updateAll
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Comunidades/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#deleteById
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Comunidades/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#count
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Comunidades/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#prototype$updateAttributes
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Comunidades/:id",
          method: "PUT"
        },

        // INTERNAL. Use Noder.host() instead.
        "::get::Noder::host": {
          url: urlBase + "/Noders/:id/host",
          method: "GET"
        },

        // INTERNAL. Use Noder.sigue.findById() instead.
        "::findById::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue/:fk",
          method: "GET"
        },

        // INTERNAL. Use Noder.sigue.destroyById() instead.
        "::destroyById::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.sigue.updateById() instead.
        "::updateById::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.sigue.link() instead.
        "::link::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.sigue.unlink() instead.
        "::unlink::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.sigue.exists() instead.
        "::exists::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Noder.sigue() instead.
        "::get::Noder::sigue": {
          isArray: true,
          url: urlBase + "/Noders/:id/sigue",
          method: "GET"
        },

        // INTERNAL. Use Noder.sigue.create() instead.
        "::create::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue",
          method: "POST"
        },

        // INTERNAL. Use Noder.sigue.destroyAll() instead.
        "::delete::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.sigue.count() instead.
        "::count::Noder::sigue": {
          url: urlBase + "/Noders/:id/sigue/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#updateOrCreate
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Comunidad` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#update
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#destroyById
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#removeById
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name NodersAPI.Comunidad#modelName
    * @propertyOf NodersAPI.Comunidad
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Comunidad`.
    */
    R.modelName = "Comunidad";

    /**
     * @ngdoc object
     * @name lbServices.Comunidad.noders
     * @header lbServices.Comunidad.noders
     * @object
     * @description
     *
     * The object `Comunidad.noders` groups methods
     * manipulating `Noder` instances related to `Comunidad`.
     *
     * Call {@link lbServices.Comunidad#noders Comunidad.noders()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#noders
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Queries noders of Comunidad.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.noders = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::get::Comunidad::noders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.noders#count
         * @methodOf NodersAPI.Comunidad.noders
         *
         * @description
         *
         * Counts noders of Comunidad.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.noders.count = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::count::Comunidad::noders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.noders#create
         * @methodOf NodersAPI.Comunidad.noders
         *
         * @description
         *
         * Creates a new instance in noders of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.noders.create = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::create::Comunidad::noders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.noders#destroyAll
         * @methodOf NodersAPI.Comunidad.noders
         *
         * @description
         *
         * Deletes all noders of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.noders.destroyAll = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::delete::Comunidad::noders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.noders#destroyById
         * @methodOf NodersAPI.Comunidad.noders
         *
         * @description
         *
         * Delete a related item by id for noders.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for noders
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.noders.destroyById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::destroyById::Comunidad::noders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.noders#findById
         * @methodOf NodersAPI.Comunidad.noders
         *
         * @description
         *
         * Find a related item by id for noders.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for noders
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.noders.findById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::findById::Comunidad::noders"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.noders#updateById
         * @methodOf NodersAPI.Comunidad.noders
         *
         * @description
         *
         * Update a related item by id for noders.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for noders
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.noders.updateById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::updateById::Comunidad::noders"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Comunidad.eventos
     * @header lbServices.Comunidad.eventos
     * @object
     * @description
     *
     * The object `Comunidad.eventos` groups methods
     * manipulating `Evento` instances related to `Comunidad`.
     *
     * Call {@link lbServices.Comunidad#eventos Comunidad.eventos()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#eventos
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Queries eventos of Comunidad.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.eventos = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::get::Comunidad::eventos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.eventos#count
         * @methodOf NodersAPI.Comunidad.eventos
         *
         * @description
         *
         * Counts eventos of Comunidad.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.eventos.count = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::count::Comunidad::eventos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.eventos#create
         * @methodOf NodersAPI.Comunidad.eventos
         *
         * @description
         *
         * Creates a new instance in eventos of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.eventos.create = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::create::Comunidad::eventos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.eventos#destroyAll
         * @methodOf NodersAPI.Comunidad.eventos
         *
         * @description
         *
         * Deletes all eventos of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.eventos.destroyAll = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::delete::Comunidad::eventos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.eventos#destroyById
         * @methodOf NodersAPI.Comunidad.eventos
         *
         * @description
         *
         * Delete a related item by id for eventos.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for eventos
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.eventos.destroyById = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::destroyById::Comunidad::eventos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.eventos#findById
         * @methodOf NodersAPI.Comunidad.eventos
         *
         * @description
         *
         * Find a related item by id for eventos.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for eventos
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.eventos.findById = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::findById::Comunidad::eventos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.eventos#updateById
         * @methodOf NodersAPI.Comunidad.eventos
         *
         * @description
         *
         * Update a related item by id for eventos.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for eventos
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R.eventos.updateById = function() {
          var TargetResource = $injector.get("Evento");
          var action = TargetResource["::updateById::Comunidad::eventos"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Comunidad.seguidores
     * @header lbServices.Comunidad.seguidores
     * @object
     * @description
     *
     * The object `Comunidad.seguidores` groups methods
     * manipulating `Noder` instances related to `Comunidad`.
     *
     * Call {@link lbServices.Comunidad#seguidores Comunidad.seguidores()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad#seguidores
         * @methodOf NodersAPI.Comunidad
         *
         * @description
         *
         * Queries seguidores of Comunidad.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.seguidores = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::get::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#count
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Counts seguidores of Comunidad.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.seguidores.count = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::count::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#create
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Creates a new instance in seguidores of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.seguidores.create = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::create::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#destroyAll
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Deletes all seguidores of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.seguidores.destroyAll = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::delete::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#destroyById
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Delete a related item by id for seguidores.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for seguidores
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.seguidores.destroyById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::destroyById::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#exists
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Check the existence of seguidores relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for seguidores
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.seguidores.exists = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::exists::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#findById
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Find a related item by id for seguidores.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for seguidores
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.seguidores.findById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::findById::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#link
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Add a related item by id for seguidores.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for seguidores
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.seguidores.link = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::link::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#unlink
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Remove the seguidores relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for seguidores
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.seguidores.unlink = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::unlink::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Comunidad.seguidores#updateById
         * @methodOf NodersAPI.Comunidad.seguidores
         *
         * @description
         *
         * Update a related item by id for seguidores.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for seguidores
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.seguidores.updateById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::updateById::Comunidad::seguidores"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name NodersAPI.Evento
 * @header NodersAPI.Evento
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Evento` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Evento",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Eventos/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Evento.suscritos.findById() instead.
        "prototype$__findById__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/:fk",
          method: "GET"
        },

        // INTERNAL. Use Evento.suscritos.destroyById() instead.
        "prototype$__destroyById__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Evento.suscritos.updateById() instead.
        "prototype$__updateById__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Evento.suscritos.link() instead.
        "prototype$__link__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Evento.suscritos.unlink() instead.
        "prototype$__unlink__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Evento.suscritos.exists() instead.
        "prototype$__exists__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Evento.suscritos() instead.
        "prototype$__get__suscritos": {
          isArray: true,
          url: urlBase + "/Eventos/:id/suscritos",
          method: "GET"
        },

        // INTERNAL. Use Evento.suscritos.create() instead.
        "prototype$__create__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos",
          method: "POST"
        },

        // INTERNAL. Use Evento.suscritos.destroyAll() instead.
        "prototype$__delete__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos",
          method: "DELETE"
        },

        // INTERNAL. Use Evento.suscritos.count() instead.
        "prototype$__count__suscritos": {
          url: urlBase + "/Eventos/:id/suscritos/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#create
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Eventos",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#upsert
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Eventos",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#exists
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` - 
         */
        "exists": {
          url: urlBase + "/Eventos/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#findById
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Eventos/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#find
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Eventos",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#findOne
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Eventos/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#updateAll
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "updateAll": {
          url: urlBase + "/Eventos/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#deleteById
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "deleteById": {
          url: urlBase + "/Eventos/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#count
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        "count": {
          url: urlBase + "/Eventos/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#prototype$updateAttributes
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Eventos/:id",
          method: "PUT"
        },

        // INTERNAL. Use Noder.suscrito.findById() instead.
        "::findById::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito/:fk",
          method: "GET"
        },

        // INTERNAL. Use Noder.suscrito.destroyById() instead.
        "::destroyById::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.suscrito.updateById() instead.
        "::updateById::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.suscrito.link() instead.
        "::link::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Noder.suscrito.unlink() instead.
        "::unlink::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.suscrito.exists() instead.
        "::exists::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Noder.suscrito() instead.
        "::get::Noder::suscrito": {
          isArray: true,
          url: urlBase + "/Noders/:id/suscrito",
          method: "GET"
        },

        // INTERNAL. Use Noder.suscrito.create() instead.
        "::create::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito",
          method: "POST"
        },

        // INTERNAL. Use Noder.suscrito.destroyAll() instead.
        "::delete::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito",
          method: "DELETE"
        },

        // INTERNAL. Use Noder.suscrito.count() instead.
        "::count::Noder::suscrito": {
          url: urlBase + "/Noders/:id/suscrito/count",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.eventos.findById() instead.
        "::findById::Comunidad::eventos": {
          url: urlBase + "/Comunidades/:id/eventos/:fk",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.eventos.destroyById() instead.
        "::destroyById::Comunidad::eventos": {
          url: urlBase + "/Comunidades/:id/eventos/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.eventos.updateById() instead.
        "::updateById::Comunidad::eventos": {
          url: urlBase + "/Comunidades/:id/eventos/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Comunidad.eventos() instead.
        "::get::Comunidad::eventos": {
          isArray: true,
          url: urlBase + "/Comunidades/:id/eventos",
          method: "GET"
        },

        // INTERNAL. Use Comunidad.eventos.create() instead.
        "::create::Comunidad::eventos": {
          url: urlBase + "/Comunidades/:id/eventos",
          method: "POST"
        },

        // INTERNAL. Use Comunidad.eventos.destroyAll() instead.
        "::delete::Comunidad::eventos": {
          url: urlBase + "/Comunidades/:id/eventos",
          method: "DELETE"
        },

        // INTERNAL. Use Comunidad.eventos.count() instead.
        "::count::Comunidad::eventos": {
          url: urlBase + "/Comunidades/:id/eventos/count",
          method: "GET"
        },
      }
    );



        /**
         * @ngdoc method
         * @name NodersAPI.Evento#updateOrCreate
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Evento` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#update
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#destroyById
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name NodersAPI.Evento#removeById
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name NodersAPI.Evento#modelName
    * @propertyOf NodersAPI.Evento
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Evento`.
    */
    R.modelName = "Evento";

    /**
     * @ngdoc object
     * @name lbServices.Evento.suscritos
     * @header lbServices.Evento.suscritos
     * @object
     * @description
     *
     * The object `Evento.suscritos` groups methods
     * manipulating `Noder` instances related to `Evento`.
     *
     * Call {@link lbServices.Evento#suscritos Evento.suscritos()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name NodersAPI.Evento#suscritos
         * @methodOf NodersAPI.Evento
         *
         * @description
         *
         * Queries suscritos of Evento.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` - 
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.suscritos = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::get::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#count
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Counts suscritos of Evento.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` - 
         */
        R.suscritos.count = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::count::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#create
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Creates a new instance in suscritos of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.suscritos.create = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::create::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#destroyAll
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Deletes all suscritos of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.suscritos.destroyAll = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::delete::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#destroyById
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Delete a related item by id for suscritos.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for suscritos
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.suscritos.destroyById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::destroyById::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#exists
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Check the existence of suscritos relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for suscritos
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.suscritos.exists = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::exists::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#findById
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Find a related item by id for suscritos.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for suscritos
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.suscritos.findById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::findById::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#link
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Add a related item by id for suscritos.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for suscritos
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.suscritos.link = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::link::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#unlink
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Remove the suscritos relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for suscritos
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.suscritos.unlink = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::unlink::Evento::suscritos"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name NodersAPI.Evento.suscritos#updateById
         * @methodOf NodersAPI.Evento.suscritos
         *
         * @description
         *
         * Update a related item by id for suscritos.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for suscritos
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Noder` object.)
         * </em>
         */
        R.suscritos.updateById = function() {
          var TargetResource = $injector.get("Noder");
          var action = TargetResource["::updateById::Evento::suscritos"];
          return action.apply(R, arguments);
        };

    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.rememberMe = undefined;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', [ '$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out non urlBase requests
          if (config.url.substr(0, urlBase.length) !== urlBase) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name NodersAPI.LoopBackResourceProvider
   * @header NodersAPI.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name NodersAPI.LoopBackResourceProvider#setAuthHeader
     * @methodOf NodersAPI.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name NodersAPI.LoopBackResourceProvider#setUrlBase
     * @methodOf NodersAPI.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
