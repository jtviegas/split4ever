'use strict';

angular.module('frontendApp')
  .service( 'api',
    function ($http, config){

      var setItem = function(input, callback){

        var url = config.API.url + '/collections/part';
        var data = input;
        var options = { headers: { 'Content-Type': 'application/json' } };

        $http.post(url, data, options)
          .then(
            function success(response) {
              console.log(response);
              if(callback)
                callback(null, response.data.result);
            },
            function error(response) {
              console.log(response);
              if(callback)
                callback(response)
            }
          );
      };

      var delItem = function(input, callback){

        var id = input._id;
        var rev = input._rev;

        $http({
            method: 'DELETE'
            , url: config.API.url + '/collections/part/' + id + '/' + rev
          }).then(
            function success(response) {
              console.log(response);
              if(callback)
                callback(null);
            },
            function error(response) {
              console.log(response);
              if(callback)
                callback(response)
            }
        );
      };

      var getItem = function(input, callback){
        var id = input._id;
        $http({
            method: 'GET'
            , url: config.API.url + '/collections/part/' + id
          }).then(
            function success(response) {
              console.log(response);
              if(callback)
                callback(null, response.data);
            },
            function error(response) {
              console.log(response);
              if(callback)
                callback(response)
            }
        );
      };

      var getDatasourceItems = function(input, callback){
        console.log('[api.getDatasourceItems] IN (%s)', JSON.stringify(input) );

        var id = input._id;
        var n = input.n;

        var options = {
          method: 'GET'
          , url: config.API.url + '/collections/part/' + id + '/' + n
          , withCredentials : true
          , headers: { 'Content-Type': 'application/json' }
        };

        if(input.filter)
          options.params = input.filter;

        $http(options).then(
            function success(response) {
              if(callback)
                callback(null, response.data.result);
            },
            function error(response) {
              if(callback)
                callback(response)
            }
        );
      };

      var getCategories = function(callback){
        $http({
            method: 'GET'
            , url: config.API.url + '/collections/part/categories'
          }).then(
            function success(response) {
              console.log(response);
              if(callback)
                callback(null, response.data.result);
            },
            function error(response) {
              console.log(response);
              if(callback)
                callback(response)
            }
        );
      };

      var getModels = function(callback){
        $http({
          method: 'GET'
          , url: config.API.url + '/collections/part/models'
        }).then(
          function success(response) {
            console.log(response);
            if(callback)
              callback(null, response.data.result);
          },
          function error(response) {
            console.log(response);
            if(callback)
              callback(response)
          }
        );
      };

/*      var addTag = function(input, callback){

        var url = config.API.url + '/collections/tag';
        var data = input;
        var options = { headers: { 'Content-Type': 'application/json' } };

        $http.post(url, data, options)
          .then(
            function success(response) {
              console.log(response);
              if(callback)
                callback(null, response.data);
            },
            function error(response) {
              console.log(response);
              if(callback)
                callback(response)
            }
          );
      };*/

      var getSession = function(callback) {

        $http({
            method: 'GET',
            url: config.API.auth.url + '/session'
          }).then(
            function success(response) {
              console.log(response);
              if(callback)
                callback(null, response.data);
            },
            function error(response) {
              console.log(response);
              if(callback)
                callback(response)
            }
          );
      };

      var getSpotlights = function(callback){
        $http({
          method: 'GET'
          , url: config.API.url + '/collections/part/spotlights'
        }).then(
          function success(response) {
            console.log(response);
            if(callback)
              callback(null, response.data.result);
          },
          function error(response) {
            console.log(response);
            if(callback)
              callback(response)
          }
        );
      };

      var getItemsFromId = function(input, callback){
          // input example: { 'size': howMany , 'filter': filter, 'id': fromId, 'inclusive': false}
        console.log('[api.getItemsFromId] IN (%s)', JSON.stringify(input) );

        var options = {
          method: 'GET'
          , url: config.API.url + '/collections/part'
          , withCredentials : true
          , headers: { 'Content-Type': 'application/json' }
          , params: {}
        };

        //do some housekeeping on values from html elements
        options.params.filter = { model: null, category: null};
        if("" != input.filter.model)
          options.params.filter.model = input.filter.model;
        if("" != input.filter.category)
          options.params.filter.category = input.filter.category;

        options.params.size = input.size;
        options.params.id = input.id;
        options.params.inclusive = input.inclusive;

        $http(options).then(
          function success(response) {
            if(callback)
              callback(null, response.data.result);
          },
          function error(response) {
            if(callback)
              callback(response)
          }
        );
      };


      var getItemsCount = function(filter, callback){
        console.log('[api.getItemsCount] IN (%s)', filter);

        var options = {
          method: 'GET'
          , url: config.API.url + '/collections/part/count'
          , withCredentials : true
          , headers: { 'Content-Type': 'application/json' }
          , params: {}
        };

        if(filter)
          options.params.filter = filter;

        $http(options).then(
          function success(response) {
            if(callback)
              callback(null, response.data.result);
          },
          function error(response) {
            if(callback)
              callback(response)
          }
        );
      };

      return {
        setItem: setItem
        , delItem: delItem
        , getItem: getItem
        , getCategories: getCategories
        , getItemsFromId: getItemsFromId
        , getSession: getSession
        , getModels: getModels
        , getSpotlights: getSpotlights
        , getItemsCount: getItemsCount
      };
    }
  )
;


