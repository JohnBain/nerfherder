angular.
module('core').
filter('tagSearch', function() {
    return function(data, queryTag) {
        var tags = [];
        var output = [];

        //to be added: determine distance between logged-in user and them and sort by distance

        angular.forEach(data, function(each) {
            tags.push(each.tags)
        }, tags);
        var tags = tags.concat.apply([], tags);
        //all tags used by users within an array. this approach will have to
        //be taken out of the filter in production. We will use an http request to a separate json holding all tags,
        //generated out of the users in our MongoDB database.

        if (queryTag){
        	if (tags.indexOf(queryTag) != -1){
        		//if our tag list contains the query...
        		angular.forEach(data, function(each){
        			//add only users who have the tag to the output.
        			if (each.tags.indexOf(queryTag) != -1){
        				output.push(each);
        			}
        		});
        	}
        	else { //if no query, just return the full user list.
        		output = data;
        	}

        }
        if (!queryTag){
        	output = data;
        }
        return output

    };
});


