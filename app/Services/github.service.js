(function(){

    // GitHub Service
    // Can return user details and user repositories

    'use strict';

    app.factory("github", ['$http', function( $http ) {

            // Retrieve user details using passed username.
            // Returns promise with user data object.

            var getUser = function( username ) {
                return $http.get( "https://api.github.com/users/" + username )
                    .then(function ( response ) {
                        return response.data;
                    });
            };

            // Retrieve user repositories using link from the user object.
            var getUserRepos = function( user ) {
                return $http.get( user.repos_url )
                    .then(function( response ) {
                        return response.data;
                    });
            };

            // Exposing service object with public methods

            return {
                getUser: getUser,
                getUserRepos: getUserRepos
            };
        
        }]);
}());