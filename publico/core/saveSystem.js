const SaveSystem = (() => {

    function getSaveKey(playerID) {
        return `domador_save_${playerID}`;
    }

    function createNewSave(playerID) {

        const novoSave = {
            playerID,
            nivel: 1,
            energiaEspiritual: 10,
            pedrasEspirituais: 0,
            pets: [],
            plantas: [],
            ultimoLogin: Date.now()
        };

        localStorage.setItem(getSaveKey(playerID), JSON.stringify(novoSave));

        return novoSave;
    }

    function loadSave(playerID) {
        const save = localStorage.getItem(getSaveKey(playerID));

        if (!save) {
            return createNewSave(playerID);
        }

        return JSON.parse(save);
    }

    function saveGame(data) {
        localStorage.setItem(getSaveKey(data.playerID), JSON.stringify(data));
    }

    return {
        loadSave,
        saveGame,
        createNewSave
    };

})();
