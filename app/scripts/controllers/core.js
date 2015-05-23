'use strict';

/**
 * @ngdoc function
 * @name nodersApp.controller:CoreCtrl
 * @description
 * # CoreCtrl
 * Controller of the nodersApp
 */
angular.module('nodersApp')
    .controller('CoreCtrl', function($scope, LoopBackAuth, $location, Noder) {
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
    });
