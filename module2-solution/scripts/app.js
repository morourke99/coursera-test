(function(){
	'use strict';

	angular.module('ShoppingListCheckOff', [])

	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemToBuy = this;

  itemToBuy.items = ShoppingListCheckOffService.getItems();

  itemToBuy.removeItem = function (itemIndex) {
     ShoppingListCheckOffService.updateLists(itemIndex);
   };

   itemToBuy.count = itemToBuy.items.length;
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemsBought = this;

  itemsBought.items = ShoppingListCheckOffService.getBoughtItems();
 
  itemsBought.count = itemsBought.items.length;
}


function ShoppingListCheckOffService() {
  var service = this;

  var itemsBoughtList = [];

  // List of shopping items
  var itemList = [{
  	name: 'beer',
  	quantity: 12
  },
  {
  	name: 'whiskey',
  	quantity: 2
  },
  {
  	name: 'vodka',
  	quantity: 5
  },
  {
  	name: 'rum',
  	quantity: 7
  },
  {
  	name: 'wine',
  	quantity: 3
  },
  {
  	name: 'gin',
  	quantity: 8
  }];

  service.updateLists = function (itemIndex) {
  	var item = {
      name: itemList[itemIndex].name,
      quantity: itemList[itemIndex].quantity
    };
   itemsBoughtList.push(item);

   itemList.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return itemList;
  };

  service.getBoughtItems = function () {
    return itemsBoughtList;
  };
}

})();