(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UsersService', 'MenuService'];
  function SignUpController(UsersService, MenuService) {
    var $ctrl = this;
    $ctrl.registrationSuccess = false;
    $ctrl.favoriteDishFound = false;

    $ctrl.signUp = function(event) {
      console.log("Sign up started... ");
      event.preventDefault();
      $ctrl.favoriteDish = $ctrl.favoriteDish ? $ctrl.favoriteDish.toUpperCase() : $ctrl.favoriteDish;
      var user = {
            firstName: $ctrl.firstName,
            lastName: $ctrl.lastName,
            email: $ctrl.email,
            phone: $ctrl.phone,
            favoriteDish: $ctrl.favoriteDish
      };

      MenuService.getMenuItem($ctrl.favoriteDish)
        .then(function(data) {
          console.log("Dish found:", data);
          user.favoriteMenuItem = data;
          UsersService.addUser(user);
          $ctrl.favoriteDishFound = true;
          $ctrl.registrationSuccess = true;
        }, function(err) {
          console.log("Dish not found...");
          UsersService.addUser(user);
          if (err = "empty") {
            $ctrl.favoriteDishFound = true;
          } else {
            $ctrl.favoriteDishFound = false;
          }
          $ctrl.registrationSuccess = true;
        });
    };
  }
})();
