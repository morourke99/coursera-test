(function(){
	'use strict';

	angular.module('NarrowItDownApp', [])

	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
  .directive('foodList', FoodListDirective);


  function FoodListDirective() {
  var ddo = {
    templateUrl: 'foodList.html',
    scope: {
      items: '<',
      message: '@',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.itemName = "";
  menu.message = '';
  menu.found = [];

  menu.addItem = function(searchTerm) {
    menu.message = '';
      menu.found = [];
    if (searchTerm !== '') {
      MenuSearchService.getMatchedItems(searchTerm).then(function(items){
        if (items.length < 1) {
          menu.message = MenuSearchService.message();
        } else {
          menu.found = items;
        }
  });
    } else {
      menu.message = MenuSearchService.message();
    }
  };

  menu.removeItem = function (itemIndex) {
     MenuSearchService.updateList(itemIndex);
   };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  var items = [];

  service.getMatchedItems = function (searchTerm) {
    items = [];
      searchTerm = searchTerm.trim().toLowerCase();
      return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function(response){
 for (var i = 0; i < response.data.menu_items.length; i++) {
      if (response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
       items.push(response.data.menu_items[i].description);
}
    }
    return items;
    }).catch(function (error) {
      console.log("Error while retrieving the data.");
    });
  } 

  service.updateList = function (itemIndex) {
    items.splice(itemIndex, 1);
};

service.message = function () {
    return "Nothing found";
};
  };



})();