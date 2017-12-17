var routerApp = angular.module('routerApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
                url: '/home',
                templateUrl: 'partial-home.html'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
                url: '/about',
                views: {

                    // the main template will be placed here (relatively named)
                    '': { templateUrl: 'partial-about.html' },

                    // the child views will be defined here (absolutely named)
                    'columnOne@about': { template: 'Look I am a column!' },

                    // for column two, we'll define a separate controller 
                    'columnTwo@about': {
                        templateUrl: 'table-data.html',
                        controller: 'scotchController'
                    }
                }

            })
            // nested list with custom controller
            .state('home.list', {
                url: '/list',
                templateUrl: 'partial-home-list.html',
                controller: 'listController'
            })
            // nested list with just some random string data
            .state('home.paragraph', {
                url: '/paragraph',
                template: 'I could sure use a drink right now.'
            })
            .state('home.list.student', {
                url: '/{id}',
                templateUrl: 'partial-home-student.html',
                controller: 'studentController'
            })

    })
    .controller('listController', ['$scope', '$rootScope', 'myFactory', function ($scope, $rootScope, myFactory) {
        console.log('in controller');
        $rootScope.flag = true;
        myFactory.getData().then(function (response, error) {
            $scope.students = response.data;
        })
    }])
    .controller('studentController', ['$scope', '$rootScope', '$stateParams', 'myStudentFactory', function ($scope, $rootScope, $stateParams, myStudentFactory) {
        console.log('in student controller');
        $rootScope.flag = false;
        myStudentFactory.getData($stateParams.id).then(function (response, error) {
            $scope.student = response.data;
        })
    }])
    .controller('scotchController', function ($scope) {

        $scope.message = 'test';

        $scope.scotches = [
            {
                name: 'Macallan 12',
                price: 50
            },
            {
                name: 'Chivas Regal Royal Salute',
                price: 10000
            },
            {
                name: 'Glenfiddich 1937',
                price: 20000
            }
        ];

    })
    .factory('myFactory', function ($http) {
        return {
            getData: function () {
                console.log('in factory');
                return $http.get("./students.json");
            }
        }
    })
    .factory('myStudentFactory', function ($http) {
        return {
            getData: function (id) {
                console.log('in student factory');
                return $http.get("./student" + id + ".json");
            }
        }
    });
