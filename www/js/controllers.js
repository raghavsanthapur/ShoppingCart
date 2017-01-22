angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$state) {
  var val =angular.element(document.getElementById('quantity'))[0];

$scope.total = 0;
$scope.newTotal = 0; 
$scope.items = [
    
    {
      'name' : 'Apple',
      'cost' : 45,
      'count' : 0
    },

    {
      'name' : 'Orange',
      'cost' : 65,
      'count' : 0
    }

];

$scope.offers = [

  {
    'name' : 'Apple',
    'buy' : 2,
    'costOf' : 1
  },
  {
    'name' : 'Orange',
    'buy' : 3,
    'costOf' : 2
  }

];

$scope.cart = angular.copy($scope.items);

$scope.getReceipt = function(){
  $scope.total = 0;  
    for (var j = $scope.items.length - 1; j >= 0; j--) {
        $scope.total += ($scope.items[j].count * $scope.items[j].cost);
    }
  console.log('total ', $scope.total);

}

$scope.applyOffers = function(){
  if($scope.offers.length > 0){
    $scope.newTotal = 0; 
    for (var i = $scope.items.length - 1; i >= 0; i--) {
      for (var j = $scope.offers.length - 1; j >= 0; j--) {
        if($scope.items[i].name == $scope.offers[j].name){
          if($scope.items[i].count < $scope.offers[j].buy){
            $scope.newTotal += ($scope.items[i].count * $scope.items[i].cost);
          } else {
            var count = $scope.items[i].count;
            while(count > 0){
              if(count >= $scope.offers[j].buy){
                $scope.newTotal += ($scope.offers[j].costOf * $scope.items[i].cost);
                count -= $scope.offers[j].buy;
              } else {
                $scope.newTotal += (count * $scope.items[i].cost);
                count = 0;
              }
            }
          }
        }
      }
    }
  }

  console.log('total', $scope.total);
}

$scope.increaseQuantity =function(item){
  item.count++ ;
  $scope.getReceipt();
}
$scope.decreaseQuantity =function(item){

  item.count--;
  $scope.getReceipt();

}

$scope.goToCart =function(){

  console.log($scope.quantity);
  console.log($scope.quantity1);
  var nextPageData={
    'apples':$scope.quantity,
    'oranges':$scope.quantity1
  }
  $state.go('tab.chats',{"data":nextPageData});

}

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
