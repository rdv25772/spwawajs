(function() {
  "use strict";

  angular.module("common")
    .service("UsersService", UsersService);

//  UsersService.$inject = [];
  function UsersService() {
    var service = this;
    //List holding the users (now Just 1)
    var user;

    service.addUser = function(newUser) {
      console.log("Adding user...");
      user = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        favoriteDish: newUser.favoriteDish,
        favoriteMenuItem: newUser.favoriteMenuItem
      };
      console.log("User added!");
    };

    service.getUser = function() {
      return user;
    };

  }
})();
