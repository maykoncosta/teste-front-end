angular.module('app').component('headerApp', {
    bindings: {
        titleHeader: "=",
    },
    templateUrl: 'common/header/header.html',
    controller: function () {},
    controllerAs: 'ctrl'
  });