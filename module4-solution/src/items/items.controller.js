(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('itemsController', itemsController);

  itemsController.$inject = ['$rootScope', '$scope', '$stateParams', 'items'];
  function itemsController($rootScope, $scope, $stateParams, items) {
    var itemsCtrl = this;

    var cancellers = [];

    itemsCtrl.items = items;
    itemsCtrl.categoryName = $stateParams.categoryName;
    itemsCtrl.spec_instr = $stateParams.instructions;

    itemsCtrl.$onInit = function () {
      var cancel = $rootScope.$on('list.loading', function(event, data) {
        itemsCtrl.loading = data.on;
      });
      cancellers.push(cancel);
    };

    itemsCtrl.$onDestoy = function () {
      cancellers.forEach(function (item) {
        item();
      });
    };

  }

})();
