const BootSystem = (() => {

    async function iniciar() {

        const app = document.getElementById("app");

        app.innerHTML = `
            <div class="boot-screen">
                <h1>🌑 Ecos da Calamidade Espiritual</h1>
                <p>Iniciando Sistema...</p>
            </div>
        `;

        await delay(1500);

        const device = DeviceSystem.init();
        const player = PlayerSystem.init();
        const version = await VersionSystem.getLocalVersion();

        console.log("Device:", device.deviceID);
        console.log("Player:", player.playerID);
        console.log("Versão:", version);

        await delay(1000);

        iniciarJogo();
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return {
        iniciar
    };

})();
