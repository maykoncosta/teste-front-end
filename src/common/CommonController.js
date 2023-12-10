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
    // Função recursiva para remover colaborador da árvore de subordinados
    const removeColaboratorFromSubordinates = function (currentColaborator, colaboratorId) {
        currentColaborator.subordinates = currentColaborator.subordinates.filter(subordinate => {
            if (subordinate.id === colaboratorId) {
                return false; // Remove o colaborador da lista de subordinados
            } else {
                // Chama recursivamente para verificar os subordinados do subordinado
                removeColaboratorFromSubordinates(subordinate, colaboratorId);
                return true;
            }
        });
    };

    // Remove o colaborador da lista principal
    const index = vm.colaborators.indexOf(colaborator);
    if (index !== -1) {
        vm.colaborators.splice(index, 1);
    }

    // Chama a função recursiva para remover da árvore de subordinados dos outros colaboradores
    vm.colaborators.forEach(otherColaborator => {
        removeColaboratorFromSubordinates(otherColaborator, colaborator.id);
    });

    // Atualiza apenas o elemento pai do colaborador removido no backend
    vm.updateColaborator(colaborator.parentId, { subordinates: vm.colaborators });
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