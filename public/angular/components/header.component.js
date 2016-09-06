
    angular.module('datingApp').component('header', {
        templateUrl: '/public/templates/header.html',
        controller: function populatePeopleController($scope, peopleService) {
            var that = this;
            peopleService.users().then(function success(response) {
                    that.people = response.data;
                })
                //that.people will be undefined if we try to log it here (due to asynchronicity), but this works
        }
    })