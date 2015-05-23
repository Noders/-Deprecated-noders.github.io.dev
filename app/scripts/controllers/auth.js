'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
    .controller('AuthCtrl', function($scope,$location, Noder, LoopBackAuth) {
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
    });
