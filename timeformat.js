
routerApp.controller('Controller', ['$scope', '$rootScope', function ($scope,$rootScope) {
    $scope.avnesh = 'M/d/yy h:mm:ss a';
    $rootScope.flag = true;
}])
    .directive('myCurrentTime', ['$interval', 'dateFilter', function ($interval, dateFilter) {

        function link(scope, element, attrs) {
            var format,
                timeoutId;

            debugger;
            function updateTime() {
                element.text(dateFilter(new Date(), avnesh));
            }

            scope.$watch(attrs.myCurrentTime, function (oldValue, newValue) {
                avnesh = oldValue;
                console.log("old value = " + oldValue + "new value = " + newValue);
                updateTime();
            });

            element.on('$destroy', function () {
                console.log("element destroyed = " + element.attrs);
                $interval.cancel(timeoutId);
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function () {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            link: link
        };
    }])