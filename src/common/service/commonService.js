angular.module('app').service("CommonService", function($http, env) {
    const urlBase = env.apiUrl;
    const vm = this;

    vm.getAllColaborators = () => {
        return $http.get(`${urlBase}/colaborators`);
    };
    
    vm.createColaborator = (colaboratorData) => {
        console.log('salvar')
        console.log(colaboratorData)
        return $http.post(`${urlBase}/colaborators`, colaboratorData);
    };
    
    vm.updateColaborator = (colaboratorId, colaboratorData) => {
        return $http.put(`${urlBase}/colaborators/${colaboratorId}`, colaboratorData);
    };
    
    vm.deleteColaborator = (colaboratorId) => {
        return $http.delete(`${urlBase}/colaborators/${colaboratorId}`);
    };

    vm.getGeneratedPass = () => {
        return $http.get(`${urlBase}/colaborators/generate-pass`);
    };

});
