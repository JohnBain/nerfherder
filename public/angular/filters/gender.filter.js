angular.
module('core')
    .filter('genderSelect', function() {
        return function(data, gender) {
            var output = [];   

            //data is our users
            //queryTag is what is typed

            if (gender) {
                angular.forEach(data, function(each) {
                    if (each.gender === gender) {
                        output.push(each)
                    }
                });

            } else {
                output = data;
            }


            return output

        };
    });

