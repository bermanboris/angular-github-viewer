(function() {
    'use strict';

    app.controller('SearchFormController', ['$scope', '$state', function( $scope, $state ) {

        $scope.search = function( username ) {
            try {
                $state.go( 'main.search', { username: username } );
            } catch( exception ) {
                console.log( exception );
            }

        }



    }]);

}());