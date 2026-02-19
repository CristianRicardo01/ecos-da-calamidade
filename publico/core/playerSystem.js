const PlayerSystem = (() => {

    function gerarUUID() {
        return crypto.randomUUID();
    }

    function criarNovoPlayer(nome) {
        return {
            playerID: gerarUUID(),
            nome: nome,
            createdAt: Date.now(),
            nivel: 1,
            energiaEspiritual: 10,
            pedrasEspirituais: 0,
            ultimoLogin: Date.now()
        };
    }

    return {
        criarNovoPlayer
    };

})();
