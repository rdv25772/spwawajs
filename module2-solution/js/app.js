(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

  toBuy.Buy = function (index) {
    ShoppingListCheckOffService.Buy(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var Bought = this;

  Bought.itemsBought = ShoppingListCheckOffService.getItemsBought();

}

function ShoppingListCheckOffService() {
  var service = this;

  //List of items bought
  var itemsToBuy = [ {"name": "Coursera course", "quantity": "1"}
                   , {"name": "to study", "quantity": "30 hours"}
                   , {"name": "cookies", "quantity": "10 Bags"}
                   , {"name": "sugary drink", "quantity": " 5 Bottles"}
                   , {"name": "chips", "quantity": "A few bags"}
                   , {"name": "some drinks", "quantity": "10 Bottles"}
                   , {"name": "bucket", "quantity": " 1"}
                   , {"name": "towels", "quantity": "some"}
                   , {"name": "great teacher", "quantity": " 1"}
                   ];

  //List of items bought
  var itemsBought = [];

  service.Buy = function (itemIndex) {
    var item = itemsToBuy[itemIndex];
    itemsBought.push(item);
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };

}

})();
