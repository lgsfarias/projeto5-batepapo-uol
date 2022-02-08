function entrar () {
    const loginScreen = document.querySelector(".loginScreen");
    loginScreen.classList.add("hide")
}

function abrirMenu () {
    const menu = document.querySelector(".menu");
    // menu.parentElement.classList.remove("hide")
    menu.style.width="259px"

}
function fecharMenu () {
    const menu = document.querySelector(".menu ");
    // menu.parentElement.classList.add("hide")
    menu.style.width="0"
}