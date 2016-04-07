app.factory('Intercept', function($rootScope) {
	return {
        request: function (config) {
        	if($rootScope.isMe()) {
        		config.headers['x-custom-header-name'] = 'secret'
        	} 
        	else if($rootScope.isAdmin()){
        		config.headers['x-custom-header-name'] = 'secret'
        		
        	}
        	else {
        		config.headers['x-custom-header-name'] = 'notsecret'
        	}
            
            return config
        }
    }
})