angular.
module('core')
    .filter('tagSearch', function() {
        return function(data, queryTag) {
            var tags = [];
            var output = [];

            //data is our users
            //queryTag is what is typed

            angular.forEach(data, function(each) {
                tags.push(each.tags)
            }, tags);

            var tags = tags.concat.apply([], tags);

            if (queryTag) {
                if (tags.indexOf(queryTag) != -1) {
                    //if our tag list contains the query...
                    angular.forEach(data, function(each) {
                        //add only users who have the tag to the output.
                        if (each.tags.indexOf(queryTag) != -1) {
                            output.push(each);
                        }
                    });
                } else { //if no query, just return the full user list.
                    output = data;
                }

            }

            if (!queryTag) {
                output = data;
            }
            return output

        };
    });
    