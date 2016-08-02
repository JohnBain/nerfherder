angular.
module('datingApp').
component('signupForm', {
  //a component is an Angular 1.5 feature
  //component is just a wrapper around directives with good defaults

    template: `<form name="form" novalidate>
  Username:
  <input type="text" ng-model="username" name="username" ng-required="true" />
</form>`,
    controller: function populateForm() {
        this.formInfo = {
            username: 'surfer_dude',
            password: 'dummypass',
            gender: 'M',
            location_info: { long: 160, lat: 150 },
            about: 'Just a guy',
            what_im_doing: 'Working',
            miscellaneous_nerdery: 'I love Hot Pockets',
            img_resources: [ 'public/images/man.jpg' ],
            tags: [ 'surfing', 'D&D' ]
        }
    }
});
