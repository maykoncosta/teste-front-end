angular
    .module("app")
    .controller("CommonController", CommonController);

function CommonController() {
    const vm = this;
    vm.titleHeader = "MEDIR SENHAS DOS COLABORADORES"
    vm.formData = {};

    vm.submitForm = function () {
        // Lógica para salvar os dados
        console.log('Dados salvos:', vm.formData);
    };

    vm.gerarSenha = function () {
        // Lógica para gerar senha
        vm.formData.senha = Math.random().toString(36).slice(-8);
    }

    vm.employees = [
        { name: 'João', score: '50%', forcePass: 'media',level: '2', subordinates: [
            { name: 'Felipe', score: '60%', forcePass: 'bom',level: '3', subordinates: [
                { name: 'Francisco', score: '93%', forcePass:'forte',level: '4', subordinates: [] },
                { name: 'Steffane', score: '10%', forcePass: 'ruim',level: '1', subordinates: [] }
            ], showSubordinates: false },
            { name: 'Maria', score: '45%', forcePass:'media',level: '2',  subordinates: [] }
        ], showSubordinates: false },
        { name: 'Moisés', score: '10%', forcePass: 'ruim',level: '1', subordinates: [
            { name: 'Carlos', score: '83%', forcePass:'forte',level: '4', subordinates: [] },
            { name: 'Ana', score: '30%', forcePass: 'media',level: '2', subordinates: [] }
        ], showSubordinates: false }
    ];

    vm.toggleSubordinates = function (employee) {
        console.log('aqui estou');
        employee.showSubordinates = !employee.showSubordinates;
    };

    vm.editEmployee = function (employee) {
        console.log('Editar:', employee);
        // Implemente a lógica de edição aqui
      };
  
      vm.deleteEmployee = function (employee) {
        console.log('Excluir:', employee);
        // Implemente a lógica de exclusão aqui
      };
}