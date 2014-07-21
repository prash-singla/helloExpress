helloExpress.factory('authInterceptor',function($rootScope, $q, $window, $location) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if($window.sessionStorage.token) {
        config.headers.access_token = $window.sessionStorage.token;
      }
      return config;
    },

    response: function(response) {
      if(response.status===401) {
        //TODO handle unauthorized case
        $window.sessionStorage.token = null;
      }
      return response || $q.when(response);
    }
  }
});

helloExpress.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
