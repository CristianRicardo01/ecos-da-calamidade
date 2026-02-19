const BootSystem = (() => {

    async function iniciar() {

        mostrarBoot();

        await delay(1500);

        let save = await ApiSystem.carregarSave();

        if (!save) {
            mostrarCriacaoPlayer();
        } else {
            iniciarJogo(save);
        }
    }

    function mostrarBoot() {
        document.getElementById("app").innerHTML = `
            <div class="boot-screen">
                <h1>🌑 Ecos da Calamidade Espiritual</h1>
                <p>Iniciando Sistema...</p>
            </div>
        `;
    }

    function mostrarCriacaoPlayer() {
        document.getElementById("app").innerHTML = `
            <h2>Desperte, novo Domador...</h2>
            <input id="nomeInput" placeholder="Nome espiritual" />
            <br><br>
            <button onclick="confirmarCriacao()">Confirmar</button>
        `;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return {
        iniciar
    };

})();
