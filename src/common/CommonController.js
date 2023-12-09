angular
    .module("app")
    .controller("CommonController", [
        "CommonService",
        CommonController
    ], );

function CommonController(CommonService) {
    const vm = this;
    vm.titleHeader = "MEDIR SENHAS DOS COLABORADORES"
    vm.formData = {};
    vm.colaborators = [];

    vm.submitForm = function () {
        vm.createColaborator(vm.formData);
    };

    vm.generatedPassword = function () {
        vm.formData.password = CommonService.generatedPassword();
    }


    vm.employees = [
        { id:'', name: 'João', score: '50%', forcePass: 'media',level: '2', subordinates: [
            { id:'',name: 'Felipe', score: '60%', forcePass: 'bom',level: '3', subordinates: [
                { id:'',name: 'Francisco', score: '93%', forcePass:'forte',level: '4', subordinates: [] },
                { id:'',name: 'Steffane', score: '10%', forcePass: 'ruim',level: '1', subordinates: [] }
            ], showSubordinates: false },
            { id:'',name: 'Maria', score: '45%', forcePass:'media',level: '2',  subordinates: [] }
        ], showSubordinates: false },
        { id:'',name: 'Moisés', score: '10%', forcePass: 'ruim',level: '1', subordinates: [
            { id:'',name: 'Carlos', score: '83%', forcePass:'forte',level: '4', subordinates: [] },
            { id:'',name: 'Ana', score: '30%', forcePass: 'media',level: '2', subordinates: [] }
        ], showSubordinates: false }
    ];

    vm.toggleSubordinates = function (employee) {
        console.log(employee);
        employee.showSubordinates = !employee.showSubordinates;
    };

    vm.editEmployee = function (employee) {
        vm.formData.name = employee.name;
        vm.formData.id = employee.id;
        
        console.log(vm.formData)
      };
  
      vm.deleteEmployee = function (employee) {
        console.log('Excluir:', employee);
        // Implemente a lógica de exclusão aqui
      };

      vm.createColaborator = (colaboratorData) => {
        CommonService
          .createColaborator(colaboratorData)
          .then((response) => {
            vm.getColaborators();
        })
        .catch((error) => {
            console.log(error);
            console.log(response);
          });
      };
    
      vm.updateColaborator = (colaboratorId, colaboratorData) => {
        CommonService
          .updateColaborator(colaboratorId, colaboratorData)
          .then((response) => {
            vm.getColaborators();
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      vm.deleteColaborator = (colaboratorId) => {
        CommonService
          .deleteColaborator(colaboratorId)
          .then((response) => {
            vm.getColaborators();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      vm.getColaborators = () => {
        CommonService
          .getAllColaborators()
          .then((response) => {
            vm.colaborators = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      };

      vm.init = () => {
        vm.getColaborators();
      };
    
      vm.init();

}