    //a component is an Angular 1.5 feature
    //component is just a wrapper around directives with good defaults


    angular.
    module('datingApp', ['core', 'datingApp.services', 'ngResource']).
    component('peopleList', {
        template: `I want to meet <select name="singleSelect" ng-model="data.singleSelect">
      <option value="Men">Men</option>
      <option value="Women">Women</option>
    </select> interested in: <input ng-model="tag" />
        <div class="col-md-offset-1">
        <ul class="list-inline"> 
        <li class="col-md-4" ng-repeat="person in $ctrl.people | tagSearch: tag">
        <img src="{{person.img_resources[0]}}"/ class="thumbnail" alt="Oops">
        <span>{{person.username}}</span>
        <p>{{person.age}}/{{person.gender}}</p>
        <ul class="list-inline "><li ng-repeat="tag in person.tags | limitTo: 3">{{tag}}</li><p>...and {{person.tags.length}} more</p></ul>
        </li> 
        </ul>`,
        controller: function populatePeopleController($scope, peopleService) {
            var that = this;
            peopleService.users().then(function success(response) {
                    that.people = response.data;
                })
                //that.people will be undefined if we try to log it here (due to asynchronicity), but this works
        }
    }).
    component('popularTags', {
        template: `<nav class="navbar navbar-inverse">
  <div class="container-fluid">
        <ul class="nav navbar-nav">
      <li><a href="#">Popular Tags:</a></li>
      <li ng-repeat="tag in tags">
               <a href="#"> {{ tag }} </a href="#">
       </li>
  </div>
  </nav>`,

        controller: function populateTags($scope, peopleService) {
            $scope.tags = [];
            //canonically, promises ought to be resolved in the controllers. So we do so here

            peopleService.users().then(function success(response) {
                var x = response.data;
                x.forEach(function(each) {
                    each['tags'].forEach(function(tag) {
                        //let's get the top 5 then a link to see all other tags on the site
                        if ($scope.tags.indexOf(tag) === -1)
                            $scope.tags.push(tag);
                    })
                })


            })
        }
    }).
    component('userProfile', {
        template: '<p> {{ user.username}} </p>',
        controller: function dummyCtrl($scope, $location, oneUserService) {

            //a ridiculous approach vs. ngRoute, but I was curious about $location & $resource

            var url = $location.$$absUrl;
            console.log(url);
            var lastElement = url.replace(/(.*)([\\\/][^\\\/]*$)/, "$2").slice(1);
            oneUserService.user(lastElement).then(function(success){
                $scope.user = success.data;
            })
            
        }
    })
