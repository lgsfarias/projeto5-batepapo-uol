let nome 
let contato = "Todos"
let visibilidade = ""

function entrar () {
    const loginScreen = document.querySelector(".loginScreen");
    loginScreen.classList.add("hide")
    nome = document.querySelector(".nome").value
}

function abrirMenu () {
    const menu = document.querySelector(".menu");
    document.querySelector(".esmaecido").classList.remove("hide");
    menu.style.width="259px"

}
function fecharMenu () {
    const menu = document.querySelector(".menu ");
    document.querySelector(".esmaecido").classList.add("hide")    
    menu.style.width="0"
}

function enviarMensagem () {
    const lista = document.querySelector("ul")
    let mensagem = document.querySelector("footer input").value
    if (mensagem){
        if (visibilidade=="público"){
            visibilidade=""
        }
        let date = new Date;
        let dataFormatada = `(${("0"+date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)})`
        lista.innerHTML+= `<li class="${visibilidade}"><p><span>${dataFormatada}</span>${nome} ${visibilidade} para ${contato}: ${mensagem}</p></li>`
    }
    document.querySelector("footer input").value=""
}

function escolheDestinatario (elemento) {
    contato=elemento.getElementsByTagName("p")[0].innerHTML
    const selecionado = elemento.parentNode.querySelector(".selecionado")
    if(selecionado !== null) { // ! = = diferente de nulo
        selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");
}

function escolheVisibilidade (elemento) {
    visibilidade=elemento.getElementsByTagName("p")[0].innerHTML.toLowerCase()
    const selecionado = elemento.parentNode.querySelector(".selecionado")
    if(selecionado !== null) { // ! = = diferente de nulo
        selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");
}