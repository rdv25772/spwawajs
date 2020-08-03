(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$rootScope', '$http', 'ApiBasePath'];
function MenuDataService($rootScope, $http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    $rootScope.$broadcast('list.loading', {on: true});
    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    })
    .then( function (result) {
      return result.data;
    })
    .catch( function (error) {
      console.log('Error loading categories data');
      throw error;
    })
    .finally(function () {
      $rootScope.$broadcast('list.loading', {on: false});
    });

  };

  service.getItemsForCategory = function (categoryShortName) {
    $rootScope.$broadcast('list.loading', {on: true});
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    })
    .then( function (result) {
      return result.data.menu_items;
    })
    .catch( function (error) {
      console.log('Error loading items data');
      throw error;
    })
    .finally(function () {
      $rootScope.$broadcast('list.loading', {on: false});
    });

  };

}

})();
