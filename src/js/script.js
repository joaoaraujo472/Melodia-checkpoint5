
const cabecalho = document.querySelector("#cabecalho");
const botaoMenu = document.querySelector("#botao-menu");
const menu = document.querySelector("#menu");

window.addEventListener("scroll", () => {
    cabecalho.classList.toggle("rolagem", window.scrollY > 30);
});

botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("aberto");
});

document.querySelectorAll("#menu a").forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("aberto");
    });
});

const musicas = [
    {
        titulo: "Neon Dream",
        artista: "Melodia Sessions",
        arquivo: "./assets/audio/neon-dream.wav"
    },
    {
        titulo: "Purple Sky",
        artista: "Melodia Sessions",
        arquivo: "./assets/audio/purple-sky.wav"
    },
    {
        titulo: "City Lights",
        artista: "Melodia Sessions",
        arquivo: "./assets/audio/city-lights.wav"
    }
];

const audio = document.querySelector("#audio");
const lista = document.querySelector("#lista-musicas");
const titulo = document.querySelector("#titulo-musica");
const tocar = document.querySelector("#tocar");
const anterior = document.querySelector("#anterior");
const proxima = document.querySelector("#proxima");
const progresso = document.querySelector("#progresso");
const tempoAtual = document.querySelector("#tempo-atual");
const duracao = document.querySelector("#duracao");

let musicaAtual = 0;

function montarLista() {
    lista.innerHTML = "";

    musicas.forEach((musica, indice) => {
        const botao = document.createElement("button");
        botao.className = "faixa";

        if (indice === musicaAtual) {
            botao.classList.add("ativa");
        }

        botao.innerHTML = `
            <span class="numero-faixa">${indice + 1}</span>
            <span>
                <strong>${musica.titulo}</strong>
                <small>${musica.artista}</small>
            </span>
            <i class="fa-solid fa-play"></i>
        `;

        botao.addEventListener("click", () => {
            carregarMusica(indice, true);
        });

        lista.appendChild(botao);
    });
}

function carregarMusica(indice, reproduzir = false) {
    musicaAtual = indice;
    audio.src = musicas[indice].arquivo;
    titulo.textContent = musicas[indice].titulo;

    montarLista();

    if (reproduzir) {
        audio.play();
    }
}

function atualizarBotao() {
    tocar.innerHTML = audio.paused
        ? '<i class="fa-solid fa-play"></i>'
        : '<i class="fa-solid fa-pause"></i>';
}

function formatarTempo(segundos) {
    if (!Number.isFinite(segundos)) {
        return "0:00";
    }

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60)
        .toString()
        .padStart(2, "0");

    return `${minutos}:${segundosRestantes}`;
}

tocar.addEventListener("click", () => {
    if (!audio.src) {
        carregarMusica(musicaAtual);
    }

    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

anterior.addEventListener("click", () => {
    const indice = (musicaAtual - 1 + musicas.length) % musicas.length;
    carregarMusica(indice, true);
});

proxima.addEventListener("click", () => {
    const indice = (musicaAtual + 1) % musicas.length;
    carregarMusica(indice, true);
});

audio.addEventListener("play", atualizarBotao);
audio.addEventListener("pause", atualizarBotao);

audio.addEventListener("ended", () => {
    proxima.click();
});

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progresso.value = (audio.currentTime / audio.duration) * 100;
    }

    tempoAtual.textContent = formatarTempo(audio.currentTime);
    duracao.textContent = formatarTempo(audio.duration);
});

progresso.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progresso.value / 100) * audio.duration;
    }
});

montarLista();


const formulario = document.querySelector("#formulario");
const email = document.querySelector("#email");
const mensagem = document.querySelector("#mensagem");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    localStorage.setItem("emailMelodia", email.value.trim());

    mensagem.textContent = "E-mail cadastrado com sucesso!";
    formulario.reset();
});
