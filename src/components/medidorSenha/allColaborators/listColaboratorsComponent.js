angular.module('app').component('listColaboratorsApp', {
    bindings: {
        employees: "<",
        toggleSubordinates: "&",
    },
    templateUrl: 'components/medidorSenha/allColaborators/listColaborators.html',
    controller: 'CommonController',
    controllerAs: 'ctrl'
});
