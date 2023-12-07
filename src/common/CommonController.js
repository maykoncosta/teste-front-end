angular
    .module("app")
    .controller("CommonController",
        CommonController,
    );

function CommonController($scope) {
    vm = this;
    vm.titleHeader = "MEDIR SENHAS DOS COLABORADORES"
    $scope.formData = {};

    $scope.submitForm = function () {
        // Lógica para salvar os dados
        console.log('Dados salvos:', $scope.formData);
    };

    $scope.gerarSenha = function () {
        // Lógica para gerar senha
        $scope.formData.senha = Math.random().toString(36).slice(-8);
    }
}