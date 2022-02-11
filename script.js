let user = { name:"gustavo"};
let contato = "Todos";
let type = "message"; //tipos de mensagem: status, message, private_message
let visibilidade = "Público";
let mensagensNaTela = document.querySelector(".mensagens ul");
let participantesNaTela = document.querySelector(".participantes")

window.onload = function() {
    document.querySelector(".nome").focus();
  };

function entrar () {
    user.name = document.querySelector(".nome").value
    if (user.name){
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",user )
        promise.then(validarUsername).catch(erroLogin);
    }
}

function validarUsername(resposta){
    const loginScreen = document.querySelector(".loginScreen");
    loginScreen.classList.add("hide")
    document.querySelector('footer input[type="text"]').focus()
    carregarMensagens();
    carregaParticipantes()
    setInterval(recarregarPagina,3000);
}   

function erroLogin(erro){
    let nome = document.querySelector(".nome");
    nome.value="";
    document.querySelector(".loginScreen .mensagem p").innerHTML="Nome de usuário já está sendo utilizado!"
}

function carregarMensagens () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(renderizarMensagens);
}

function renderizarMensagens (mensagens) {
    mensagensNaTela.innerHTML="";
    mensagens.data.forEach(adicionarMensagem);
}

function adicionarMensagem(mensagem){
    // let mensagens = document.querySelector(".mensagens ul")
    switch(mensagem.type) {
        case "status":
            mensagensNaTela.innerHTML+=`<li data-identifier="message" class=${mensagem.type}><p><span>(${mensagem.time})</span><b>${mensagem.from}</b> ${mensagem.text}</p></li>`
            break;
        case "message":
            mensagensNaTela.innerHTML+=`<li data-identifier="message" class=${mensagem.type}><p><span>(${mensagem.time})</span><b>${mensagem.from}</b> para <b>${mensagem.to}</b>: ${mensagem.text}</p></li>`
            break;
        case "private_message":
            if(mensagem.to===user.name||mensagem.from===user.name){
                mensagensNaTela.innerHTML+=`<li data-identifier="message" class=${mensagem.type}><p><span>(${mensagem.time})</span><b>${mensagem.from}</b> reservadamente para <b>${mensagem.to}</b>: ${mensagem.text}</p></li>`
                break;
            }
        default:
            // code block
    }
    const elementoQueQueroQueApareca = document.querySelector('.mensagens ul').lastElementChild;
    elementoQueQueroQueApareca.scrollIntoView();
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
    document.querySelector('footer input[type="text"]').focus()
}


function carregaParticipantes(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promise.then(renderizaParticipantes)
}

function renderizaParticipantes (participantes) {
    participantesNaTela.innerHTML=`<li onclick="escolheDestinatario(this)" data-identifier="participant">
    <ion-icon name="people"></ion-icon><p>Todos</p>
    <ion-icon class="check" name="checkmark-sharp"></ion-icon>
</li>`
    participantes.data.forEach(adicionaParticipante)

    let contatoOnline = false;
    
    for (participante of participantesNaTela.children){
        if(participante.querySelector("p").innerHTML==contato){
            participante.classList.add("selecionado")
            contatoOnline=true
        }
    }

    if(!contatoOnline){
        contato="Todos"
        participantesNaTela.children[0].classList.add("selecionado")
        const resumo = document.querySelector("footer p");
        resumo.innerHTML=`Enviando para ${contato} (${visibilidade})`

    }

}

function adicionaParticipante (participante) {
    if(participante.name!==user.name){
        participantesNaTela.innerHTML+=`<li onclick="escolheDestinatario(this)" data-identifier="participant">
        <ion-icon name="person-circle"></ion-icon><p>${participante.name}</p>
        <ion-icon class="check" name="checkmark-sharp"></ion-icon>
    </li>`
    }
}

function enviarMensagem () {
    let mensagem = document.querySelector("footer input").value
    if(mensagem){
        let objetoMensagem = {
            from: user.name,
            to: contato,
            text: mensagem,
            type: type // ou "private_message" para o bônus
        }
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",objetoMensagem)
        promise.then(mensagemEnviada)
        promise.catch(mensagemErro)
    }    
}

function mensagemErro(){
    window.location.reload()
}

function mensagemEnviada () {
    document.querySelector("footer input").value=""
    carregarMensagens()
    // const elementoQueQueroQueApareca = document.querySelector('.mensagens ul').lastElementChild;
    // elementoQueQueroQueApareca.scrollIntoView();
}

function escolheDestinatario (elemento) {
    contato=elemento.getElementsByTagName("p")[0].innerHTML
    const selecionado = elemento.parentNode.querySelector(".selecionado")
    if(selecionado !== null) { // ! = = diferente de nulo
        selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");
    const resumo = document.querySelector('footer p');
    resumo.innerHTML=`Enviando para ${contato} (${visibilidade})`
}

function escolheVisibilidade (elemento) {
    visibilidade=elemento.getElementsByTagName("p")[0].innerHTML
    switch (visibilidade) {
        case "Público":
            type="message"
            break;
        case "Reservadamente":
            type="private_message"
            break;
        default:
            break;
    }
    const selecionado = elemento.parentNode.querySelector(".selecionado")
    if(selecionado !== null) { // ! = = diferente de nulo
        selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");
    const resumo = document.querySelector("footer p");
    resumo.innerHTML=`Enviando para ${contato} (${visibilidade})`
}

document.querySelector('footer input[type="text"]').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      enviarMensagem()
    }
});

document.querySelector('.nome').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      entrar()
    }
});

function recarregarPagina(){
    carregarMensagens()
    carregaParticipantes()
    const online = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",user )
    online.then()
}