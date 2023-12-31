angular
  .module("app")
  .controller("CommonController", ["CommonService", CommonController]);

function CommonController(CommonService) {
  const vm = this;
  vm.titleHeader = "MEDIR SENHAS DOS COLABORADORES";
  vm.formData = {};
  vm.colaborators = [];
  vm.subordinates = [];
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
    vm.formData = colaborator;
  };

  vm.addSubordinate = function () {
    const newSubordinate = {
      name: vm.formData.name,
      password: vm.formData.password,
      leadId: vm.formData.leadId,
      id: "SUBORDINATE"
    };

    vm.updateColaborator(newSubordinate.id, newSubordinate);

    vm.showLeadInput = false;
    vm.formData.lead = '';
    vm.formData.leadId = '';
  };

  vm.enableSubordinate = function (colaborator) {
    vm.showLeadInput = true;
    vm.formData.lead = colaborator.name;
    vm.formData.leadId = colaborator.id;
  };

  vm.deleteColaborator = function (colaborator) {
    const index = vm.colaborators.indexOf(colaborator);
    if (index !== -1) {
      vm.colaborators.splice(index, 1);
      CommonService
        .deleteColaborator(colaborator.id)
        .then(() => {
          vm.getColaborators();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const removeColaboratorFromSubordinates = function (currentColaborator, colaboratorId) {
        currentColaborator.subordinates = currentColaborator.subordinates.filter(subordinate => {
          if (subordinate.id === colaboratorId) {
            return false; 
          } else {
            removeColaboratorFromSubordinates(subordinate, colaboratorId);
            return true;
          }
        });
      };

      vm.colaborators.forEach(otherColaborator => {
        removeColaboratorFromSubordinates(otherColaborator, colaborator.id);
      });

      vm.colaborators.forEach(updatedColaborator => {
        updatedColaborator.subordinateRemoved =colaborator.id;
        console.log(updatedColaborator);
        vm.updateColaborator(updatedColaborator.id, updatedColaborator);
      });
    }


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
    console.log('init');
    if (vm.colaborators.length === 0) {
      vm.getColaborators();
    }
  };

  vm.init();
}