(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('categoriesController', categoriesController);

  categoriesController.$inject = ['categories'];
  function categoriesController(categories) {
    var categoriesCtrl = this;

    categoriesCtrl.categories = categories;
  }


})();
