(function() {
    'use strict';

    app.config( function( $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider ) {

        var prettyUrl = {
            encode: function(str) { return str && str.replace(/ /g, "-"); },
            decode: function(str) { return str && str.replace(/-/g, " "); },
            is: angular.isString,
            pattern: /[^/]+/
        };

        $urlRouterProvider.otherwise( '/search/angular' );
        $urlMatcherFactoryProvider.type( 'name', prettyUrl );
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
                url: '/search/{username:name}',
                resolve: {
                    user: ['github', '$stateParams', '$q', function( github, $stateParams, $q ){
                        if ( $stateParams.username ) {
                            var deferred = $q.defer();
                            
                            github.getUserByName( $stateParams.username ).then( function( user ) {
                                deferred.resolve( user );
                            });

                            return deferred.promise;

                        };
                    }],
                    repos: ['github', '$q', 'user', function( github, $q, user ){
                        if ( user ) {
                            var deferred = $q.defer();
                            github.getUserRepos( user ).then( function( repos ) {
                                deferred.resolve( repos );
                            });

                            return deferred.promise;
                        };
                    }],
                },
                views: {
                    '': {
                        templateUrl: 'States/Search/SearchLayout.tpl.html'
                    },
                    'form@main.search': {
                        templateUrl: 'States/Search/SearchForm/SearchForm.tpl.html',
                        controller: 'SearchFormController'
                    },
                    'results@main.search': {
                        templateUrl: 'States/Search/SearchResults/SearchResults.tpl.html',
                        controller: 'SearchResultsController'
                    }
                },
                params: {
                    username: {
                        // Trailing slash fix
                        squash: true,
                        value: null
                    },
                    repos: {
                        // Trailing slash fix
                        squash: true,
                        value: null
                    }
                }
            })
            .state('main.about', {
                url: '/about',
                template: 'About'
            })

    });

}());