angular.module('app').component('subordinatesApp', {
    bindings: {
        formData:"=",
        showLeadInput:"=",
        subordinates: '<',
    },
    templateUrl: 'components/medidorSenha/allColaborators/subordinates/subordinates.html',
    controller: 'CommonController',
    controllerAs: 'ctrl'
});
