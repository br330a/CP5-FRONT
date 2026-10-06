// Menu mobile

const sidebar = document.querySelector("#sidebar");
const botaoMenu = document.querySelector("#botao-menu");

botaoMenu.addEventListener("click", function () {
    sidebar.classList.toggle("hidden");

    const aberto = !sidebar.classList.contains("hidden");
    botaoMenu.setAttribute("aria-expanded", aberto);
});

// Dropdown do usuário

const botaoUsuario = document.querySelector("#botao-usuario");
const dropdown = document.querySelector("#dropdown");
const areaUsuario = document.querySelector("#area-usuario");

botaoUsuario.addEventListener("click", function () {
    dropdown.classList.toggle("hidden");

    const aberto = !dropdown.classList.contains("hidden");
    botaoUsuario.setAttribute("aria-expanded", aberto);
});

document.addEventListener("click", function (evento) {
    if (!areaUsuario.contains(evento.target)) {
        dropdown.classList.add("hidden");
        botaoUsuario.setAttribute("aria-expanded", "false");
    }
});

// Tema

const tema = document.querySelector("#tema");
const sistema = window.matchMedia("(prefers-color-scheme: dark)");

tema.value = localStorage.getItem("tema") || "system";

function aplicarTema() {
    const escuro =
        tema.value === "dark" ||
        (tema.value === "system" && sistema.matches);

    document.documentElement.classList.toggle("dark", escuro);
}

tema.addEventListener("change", function () {
    localStorage.setItem("tema", tema.value);
    aplicarTema();
});

sistema.addEventListener("change", aplicarTema);

aplicarTema();

// Modal

const modal = document.querySelector("#modal");
const formulario = document.querySelector("#formulario");
const campos = document.querySelectorAll(".campo");
const mensagem = document.querySelector("#mensagem");
const cadastrar = document.querySelector("#cadastrar");

document.querySelector("#novo-projeto").addEventListener("click", function () {
    formulario.reset();
    mensagem.textContent = "";
    cadastrar.disabled = false;

    campos.forEach(function (campo) {
        campo.classList.remove("erro", "sucesso");
        campo.removeAttribute("aria-invalid");
        campo.nextElementSibling.textContent = "";
    });

    modal.showModal();
});

document.querySelector("#fechar-modal").addEventListener("click", function () {
    modal.close();
});

// Validação

function validarCampo(campo) {
    let erro = "";
    const valor = campo.value.trim();

    if (valor === "") {
        erro = "Preencha este campo.";
    } else if (campo.minLength > 0 && valor.length < campo.minLength) {
        erro = `Digite pelo menos ${campo.minLength} caracteres.`;
    } else if (!campo.checkValidity()) {
        erro = "Informe um valor válido.";
    }

    campo.classList.toggle("erro", erro !== "");
    campo.classList.toggle("sucesso", erro === "");
    campo.setAttribute("aria-invalid", erro !== "");
    campo.nextElementSibling.textContent = erro;

    return erro === "";
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let valido = true;

    campos.forEach(function (campo) {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });

    if (valido) {
        mensagem.textContent = "Dados validados com sucesso! Cadastro demonstrativo.";
        cadastrar.disabled = true;
    } else {
        mensagem.textContent = "";
        formulario.querySelector(".erro").focus();
    }
});

campos.forEach(function (campo) {
    campo.addEventListener("input", function () {
        cadastrar.disabled = false;
        mensagem.textContent = "";

        if (campo.hasAttribute("aria-invalid")) {
            validarCampo(campo);
        }
    });
});

// Pesquisa de projetos

const pesquisa = document.querySelector("#pesquisa");
const projetos = document.querySelectorAll("#projetos article");

pesquisa.addEventListener("input", function () {
    const termo = pesquisa.value.trim().toLowerCase();

    projetos.forEach(function (projeto) {
        const texto = projeto.textContent.toLowerCase();

        projeto.classList.toggle("hidden", !texto.includes(termo));
    });
});

// Destaque do menu selecionado

const linksMenu = document.querySelectorAll("#sidebar nav a");

linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
        linksMenu.forEach(function (item) {
            const selecionado = item === link;

            item.classList.toggle("bg-indigo-100", selecionado);
            item.classList.toggle("text-indigo-800", selecionado);
            item.classList.toggle("dark:bg-white", selecionado);
            item.classList.toggle("dark:text-slate-900", selecionado);
        });
    });
});