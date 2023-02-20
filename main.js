let nomeCompleto = document.getElementById('nomeForm');
let telefone = document.getElementById('telefoneForm');
let linhas = '';
const formulario = document.getElementById('form-atividade');
let arrayDeNomes;
let arrayDeNumeros = [];
let arrayNomeRepetido = [];
const jsConfetti = new JSConfetti();
const mensagemSucesso = document.querySelector('.sucesso-mensagem')
const gatinhoSucessoDireita = document.querySelector('.gatinhoDireita')
const gatinhoSucessoEsquerda = document.querySelector('.gatinhoEsquerda')

function validaNome(nomeCompleto) {
    const nomeMaximo = nomeCompleto.split(' ');
    return nomeMaximo.length >= 2;
}

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    nomeCompleto = document.getElementById('nomeForm');
    telefone = document.getElementById('telefoneForm');

    arrayDeNomes = nomeCompleto.value.split(" ");
    let testeDuplicado = hasDuplicates(arrayDeNomes);
    console.log(`Nome ${testeDuplicado}`);


    mensagemSucesso.style.display = "none"
    gatinhoSucessoEsquerda.style.display = "none"
    gatinhoSucessoDireita.style.display = "none"

    if(!validaNome(nomeCompleto.value)) {
        mensagemErroNomeIncompleto();
    }else if(arrayDeNumeros.includes(telefone.value)){
        mensagemErroNumero();
    }else if(arrayNomeRepetido.includes(nomeCompleto.value)){
        mensagemErroNomeDuplicado();
    }else if(testeDuplicado != true){

        arrayNomeRepetido.push(nomeCompleto.value)
        arrayDeNumeros.push(telefone.value)

        let linha = '<tr>';
        linha += `<td>${nomeCompleto.value}</td>`;
        linha += `<td>${telefone.value}</td>`;
        linha += '</tr>';
        
        linhas += linha;
        
        mensagemSucesso2();

        const corpoTabela = document.querySelector('tbody');
        corpoTabela.innerHTML = linhas;
    }else{
        mensagemErro();
    }
    nomeCompleto.value = '';
    telefone.value = '';
})

function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            console.log("epa, deu certo. Tem duplicado!")
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}

function mensagemSucesso2(){
    mensagemSucesso.style.display = "flex"
        mensagemSucesso.innerHTML = 'Parabéns! O seu nome e numero foram adicionados com sucesso.'
        mensagemSucesso.style.color = '#125a0f'
        jsConfetti.addConfetti()
        gatinhoSucessoDireita.style.display = "block"
        gatinhoSucessoEsquerda.style.display = "block"
}

function mensagemErro(){
    mensagemSucesso.style.display = "flex"
    mensagemSucesso.innerHTML = 'O nome está duplicado, por favor mude o nome.'
    mensagemSucesso.style.color = "#ff0000"
}

function mensagemErroNumero(){
    mensagemSucesso.style.display = "flex"
    mensagemSucesso.innerHTML = 'Numero duplicado, por favor mude o seu numero.'
    mensagemSucesso.style.color = "#ff0000"
}

function mensagemErroNomeDuplicado(){
    mensagemSucesso.style.display = "flex"
    mensagemSucesso.innerHTML = 'Nome duplicado, por favor mude o seu nome.'
    mensagemSucesso.style.color = "#ff0000"
}

function mensagemErroNomeIncompleto(){
    mensagemSucesso.style.display = "flex"
    mensagemSucesso.innerHTML = 'O nome está incompleto, por favor mude o nome.'
    mensagemSucesso.style.color = "#ff0000"
}