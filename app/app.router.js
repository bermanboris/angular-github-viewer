(function() {
    'use strict';

    app.config( function( $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider ) {

        $urlRouterProvider.otherwise( '/search' );
        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            .state('main', {
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'States/Main/MainLayout.tpl.html'
                    },
                    'header@main': {
                        templateUrl: 'States/Main/Header/Header.tpl.html'
                    },
                    'footer@main': {
                        templateUrl: 'States/Main/Footer/Footer.tpl.html'
                    }
                }
            })
            .state('main.search', {
                url: '/search/:username',
                resolve: {
                  user: ['github', '$stateParams', '$q', function( github, $stateParams, $q ){
                      if ( $stateParams.username ) {
                          var deferred = $q.defer();
                          github.getUser( $stateParams.username ).then( function( user ) {
                              deferred.resolve( user );
                          });

                          return deferred.promise;

                      };
                  }]
                },
                views: {
                    '': {
                        templateUrl: 'States/Search/SearchLayout.tpl.html'
                    },
                    'form@main.search': {
                        templateUrl: 'States/Search/SearchForm/SearchForm.tpl.html'
                    },
                    'results@main.search': {
                        templateUrl: 'States/Search/SearchResults/SearchResults.tpl.html',
                        controller: function( $scope, user ) {
                            console.log(user);
                                $scope.user = user;
                        }
                    }
                },
                params: {
                    username: {
                        // Trailing slash fix
                        squash: true,
                        value: null
                    }
                }
            })

    });

}());