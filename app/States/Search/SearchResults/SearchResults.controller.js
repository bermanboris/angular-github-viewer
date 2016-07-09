(function() {
    'use strict';

    app.controller('SearchResultsController', ['$scope', 'repos', 'user', function( $scope, repos, user ) {

        $scope.user = user;
        $scope.repos = repos;

        $scope.repoSortOrder = '-stargazers_count';
        
    }]);

}());