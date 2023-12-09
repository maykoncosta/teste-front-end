angular
  .module("app")
  .controller("CommonController", ["CommonService", CommonController]);

function CommonController(CommonService) {
  const vm = this;
  vm.titleHeader = "MEDIR SENHAS DOS COLABORADORES";
  vm.formData = {};
  vm.colaborators = [];
  vm.showLeadInput = false;

  vm.submitForm = function () {
    if (vm.formData.lead) {
      vm.addSubordinate(vm.formData);
    } else if (vm.formData.id) {
      vm.updateColaborator(vm.formData.id, vm.formData);
    } else {
      vm.createColaborator(vm.formData);
    }
  };

  vm.generatedPassword = function () {
    CommonService
      .getGeneratedPass()
      .then((response) => {
        vm.formData.password = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  vm.toggleSubordinates = function (colaborator) {
    colaborator.showSubordinates = !colaborator.showSubordinates;
  };

  vm.editColaborator = function (colaborator) {
    vm.formData = angular.copy(colaborator);
  };

  vm.addSubordinate = function () {
    const newSubordinate = {
        name: vm.formData.name,
        password: vm.formData.password,
    };

    const liderId = vm.formData.leadId;
    const colaboratorLead = vm.colaborators.find(colaborator => colaborator.id === liderId);

    if (colaboratorLead) {
      if(colaboratorLead.subordinates){
        colaboratorLead.subordinates.push(newSubordinate);
      }else{
        colaboratorLead.subordinates = [newSubordinate];
      }

        vm.updateColaborator(colaboratorLead.id, colaboratorLead);

        vm.showSuperiorInput = false;
        vm.formData.lead = '';
        vm.formData.leadId = '';
    } else {
        console.log('Líder não encontrado.');
    }
};

  vm.enableSubordinate = function (colaborator) {
    vm.showLeadInput = true;
    vm.formData.lead = colaborator.name;
    vm.formData.leadId = colaborator.id;
    console.log('aqui')
  };

  vm.deleteColaborator = function (colaborator) {
    CommonService.deleteColaborator(colaborator.id)
      .then(() => {
        const index = vm.colaborators.indexOf(colaborator);

        if (index !== -1) {
          vm.colaborators.splice(index, 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  vm.createColaborator = function (colaboratorData) {
    CommonService
      .createColaborator(colaboratorData)
      .then(() => {
        vm.getColaborators();
        vm.clearForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  vm.updateColaborator = function (colaboratorId, colaboratorData) {
    CommonService
      .updateColaborator(colaboratorId, colaboratorData)
      .then(() => {
        vm.getColaborators();
        vm.clearForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  vm.clearForm = function () {
    vm.formData = {};
  };

  vm.getColaborators = function () {
    CommonService
      .getAllColaborators()
      .then((response) => {
        console.log(response.data);
        vm.colaborators = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  vm.init = function () {
    vm.getColaborators();
  };

  vm.init();
}