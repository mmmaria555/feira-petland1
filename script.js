document.addEventListener("DOMContentLoaded", function () {

    const lista = document.getElementById("listaAnimais");
    const campoBusca = document.getElementById("campoBusca");
    const botaoLimpar = document.getElementById("botaoLimpar");
    const botoesFiltro = document.querySelectorAll(".filtro");
    const semResultados = document.getElementById("semResultados");
    const quantidade = document.getElementById("quantidadeResultados");

    let filtroAtual = "todos";


    function normalizar(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    }


    function criarCard(animal) {

        const card = document.createElement("article");

        card.className = "card-animal";


        const imagem = document.createElement("div");

        imagem.className = "foto-animal";


        const img = document.createElement("img");

        img.src = animal.foto;

        img.alt = "Foto de " + animal.nome;


        img.onerror = function () {

            imagem.innerHTML = `
                <div class="foto-placeholder">
                    <span>🐾</span>
                    <p>Foto em breve</p>
                </div>
            `;

        };


        imagem.appendChild(img);


        const conteudo = document.createElement("div");

        conteudo.className = "conteudo-card";


        let identificacao = "";

        if (animal.identificacao) {

            identificacao = `
                <span class="identificacao">
                    ${animal.identificacao}
                </span>
            `;

        }


        conteudo.innerHTML = `

            <span class="local">
                ${animal.local}
            </span>

            <h3>
                ${animal.nome}
            </h3>

            ${identificacao}

            <div class="informacao">

                <strong>Responsável</strong>

                <span>
                    ${animal.responsavel}
                </span>

            </div>


            <div class="informacao">

                <strong>Entrevistadoras</strong>

                <span>
                    ${animal.entrevistadoras}
                </span>

            </div>


            <div class="historia">

                <strong>História</strong>

                <p>
                    ${
                        animal.historia
                        ? animal.historia
                        : "A história deste animal será adicionada em breve."
                    }
                </p>

            </div>

        `;


        card.appendChild(imagem);

        card.appendChild(conteudo);


        return card;

    }



    function exibirAnimais() {

        const texto = normalizar(campoBusca.value);


        const resultados = animais.filter(function (animal) {

            const nome = normalizar(animal.nome);

            const responsavel = normalizar(animal.responsavel);

            const local = normalizar(animal.local);


            const correspondeBusca =
                nome.includes(texto) ||
                responsavel.includes(texto) ||
                local.includes(texto);


            let correspondeFiltro = true;


            if (filtroAtual !== "todos") {

                if (filtroAtual === "Cercado") {

                    correspondeFiltro =
                        animal.local.toLowerCase().includes("cercado");

                } else {

                    correspondeFiltro =
                        animal.local.toLowerCase() ===
                        filtroAtual.toLowerCase();

                }

            }


            return correspondeBusca && correspondeFiltro;

        });


        lista.innerHTML = "";


        quantidade.textContent =
            resultados.length +
            (resultados.length === 1
                ? " animal encontrado"
                : " animais encontrados");


        if (resultados.length === 0) {

            semResultados.style.display = "block";

            return;

        }


        semResultados.style.display = "none";


        resultados.forEach(function (animal) {

            lista.appendChild(criarCard(animal));

        });

    }



    campoBusca.addEventListener("input", function () {

        exibirAnimais();

    });



    botaoLimpar.addEventListener("click", function () {

        campoBusca.value = "";

        filtroAtual = "todos";


        botoesFiltro.forEach(function (botao) {

            botao.classList.remove("ativo");

        });


        document
            .querySelector('[data-filtro="todos"]')
            .classList.add("ativo");


        exibirAnimais();

        campoBusca.focus();

    });



    botoesFiltro.forEach(function (botao) {

        botao.addEventListener("click", function () {

            botoesFiltro.forEach(function (item) {

                item.classList.remove("ativo");

            });


            botao.classList.add("ativo");


            filtroAtual =
                botao.getAttribute("data-filtro");


            exibirAnimais();

        });

    });


    exibirAnimais();

});