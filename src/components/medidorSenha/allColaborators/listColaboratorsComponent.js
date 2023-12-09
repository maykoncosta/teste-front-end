angular.module('app').component('listColaboratorsApp', {
    bindings: {
        formData:"=",
        showLeadInput:"=",
        colaborators: '<',
    },
    templateUrl: 'components/medidorSenha/allColaborators/listColaborators.html',
    controller: 'CommonController',
    controllerAs: 'ctrl'
});
