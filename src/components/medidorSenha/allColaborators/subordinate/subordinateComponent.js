angular.module('app').component('subordinateApp', {
    bindings: {
        employee:"<",
    },
    templateUrl: 'components/medidorSenha/allColaborators/subordinate/subordinate.html',
    controller: 'CommonController',
    controllerAs: 'ctrl'
});
