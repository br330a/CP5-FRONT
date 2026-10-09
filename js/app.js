// Menu mobile

const sidebar = document.querySelector("#sidebar");
const botaoMenu = document.querySelector("#botao-menu");
const telaDesktop = window.matchMedia("(min-width: 1024px)");

function fecharMenu() {
    sidebar.classList.add("hidden");
    botaoMenu.setAttribute("aria-expanded", "false");
}

botaoMenu.addEventListener("click", function () {
    const aberto = botaoMenu.getAttribute("aria-expanded") === "true";

    sidebar.classList.toggle("hidden", aberto);
    botaoMenu.setAttribute("aria-expanded", String(!aberto));
});

document.addEventListener("click", function (evento) {
    if (
        !telaDesktop.matches &&
        !sidebar.contains(evento.target) &&
        !botaoMenu.contains(evento.target)
    ) {
        fecharMenu();
    }
});

telaDesktop.addEventListener("change", fecharMenu);

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

        if (!telaDesktop.matches) {
            fecharMenu();
        }
    });
});

// Dropdown do usuário

const botaoUsuario = document.querySelector("#botao-usuario");
const dropdown = document.querySelector("#dropdown");
const areaUsuario = document.querySelector("#area-usuario");

function fecharDropdown() {
    dropdown.classList.add("hidden");
    botaoUsuario.setAttribute("aria-expanded", "false");
}

botaoUsuario.addEventListener("click", function () {
    dropdown.classList.toggle("hidden");

    const aberto = !dropdown.classList.contains("hidden");
    botaoUsuario.setAttribute("aria-expanded", String(aberto));
});

document.addEventListener("click", function (evento) {
    if (!areaUsuario.contains(evento.target)) {
        fecharDropdown();
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        if (botaoMenu.getAttribute("aria-expanded") === "true") {
            fecharMenu();
            botaoMenu.focus();
        }

        if (botaoUsuario.getAttribute("aria-expanded") === "true") {
            fecharDropdown();
            botaoUsuario.focus();
        }
    }
});

// Tema

const tema = document.querySelector("#tema");
const sistema = window.matchMedia("(prefers-color-scheme: dark)");
const temaSalvo = localStorage.getItem("tema");

tema.value = ["light", "dark", "system"].includes(temaSalvo)
    ? temaSalvo
    : "system";

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

// Pesquisa de projetos

const pesquisa = document.querySelector("#pesquisa");
const listaProjetos = document.querySelector("#lista-projetos");
const semResultados = document.querySelector("#sem-resultados");

function filtrarProjetos() {
    const termo = pesquisa.value.trim().toLowerCase();
    const projetos = listaProjetos.querySelectorAll("article");
    let encontrados = 0;

    projetos.forEach(function (projeto) {
        const texto = projeto.textContent.toLowerCase();
        const encontrado = texto.includes(termo);

        projeto.classList.toggle("hidden", !encontrado);

        if (encontrado) {
            encontrados++;
        }
    });

    semResultados.classList.toggle("hidden", encontrados > 0);
}

pesquisa.addEventListener("input", filtrarProjetos);

// Modal

const modal = document.querySelector("#modal");
const formulario = document.querySelector("#formulario");
const campos = formulario.querySelectorAll(".campo");
const mensagem = document.querySelector("#mensagem");
const cadastrar = document.querySelector("#cadastrar");
const totalAtivos = document.querySelector("#total-ativos");

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
    campo.setAttribute("aria-invalid", String(erro !== ""));
    campo.nextElementSibling.textContent = erro;

    return erro === "";
}

// Criação do card

function adicionarProjeto() {
    const nome = document.querySelector("#nome").value.trim();
    const responsavel = document.querySelector("#responsavel").value.trim();
    const categoria = document.querySelector("#categoria").value;
    const prioridade = document.querySelector("#prioridade").value;
    const prazo = document.querySelector("#prazo").value;
    const descricao = document.querySelector("#descricao").value.trim();

    // Reutiliza o estilo do primeiro card.
    const card = listaProjetos.querySelector("article").cloneNode(true);

    card.classList.remove("hidden", "md:col-span-2", "xl:row-span-2");
    card.classList.add("break-words");

    card.querySelector("h3").textContent = nome;

    const paragrafos = card.querySelectorAll("p");
    const dataFormatada = prazo.split("-").reverse().join("/");

    paragrafos[0].textContent = descricao;

    paragrafos[1].textContent =
        `Responsável: ${responsavel} • Categoria: ${categoria} • ` +
        `Prioridade: ${prioridade} • Prazo: ${dataFormatada} • Em andamento`;

    listaProjetos.appendChild(card);

    totalAtivos.textContent = Number(totalAtivos.textContent) + 1;

    pesquisa.value = "";
    filtrarProjetos();
}

// Envio do formulário

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (cadastrar.disabled) {
        return;
    }

    let valido = true;

    campos.forEach(function (campo) {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });

    if (!valido) {
        mensagem.textContent = "";
        formulario.querySelector(".erro").focus();
        return;
    }

    adicionarProjeto();

    mensagem.textContent = "Projeto cadastrado com sucesso!";
    cadastrar.disabled = true;
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