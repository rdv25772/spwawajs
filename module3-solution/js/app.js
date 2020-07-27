(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.searchItem = "";
  list.found = "";

  list.getMatchedMenuItems = function () {

    return MenuSearchService.getMatchedMenuItems(list.searchItem)
    .then(function (response) {
      list.message = "";
      list.found = response;
      if (list.found.length == 0 ) {
        list.message = "Nothing found!";
      }
    });

  }

  list.removeItem = function (itemIndex) {
    list.found.splice(itemIndex, 1);
  };

}

MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath'];
function MenuSearchService($http, $q, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    if (searchTerm === "") {
      return $q.when([]);
    }

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    })
    .then( function (result) {
      // process result and only keep items that match
      var foundItems = [];
      var menu_items = result.data.menu_items;
      for (var i = 0; i < menu_items.length; i++) {
        var item = menu_items[i];
        if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.push(item);
        }
      }

      // return processed items
      return foundItems;
    });

  };

}

function FoundItemsDirective() {
  var ddo = {
    restrict: 'E',
    templateUrl: 'found-items.html',
    scope: {
      foundItems: '<',
      message: '<',
      onRemove: '&'
    } ,
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var found = this;

  found.foundItemsFilled = function () {
    if (found.foundItems.length > 0) {
      return true;
    }
    return false;
  };
}

})();
