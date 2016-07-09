(function() {
    'use strict';

    app.controller('SearchFormController', ['$scope', '$state', function( $scope, $state ) {

        $scope.search = function( username ) {
            $state.go( 'main.search', { username: username } );
        }

    }]);

}());