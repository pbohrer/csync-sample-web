angular.module('simpleApp')
.controller('mainController', ['$scope', 'CSync',
    function($scope, CSync) {
        'use strict';
        
        $scope.tree = CSync.createListenTree("rooms.#", function() {
        	console.log("tree updated")
        	$scope.$apply()
        })

}]);