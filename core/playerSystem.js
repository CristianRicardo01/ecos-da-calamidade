const PlayerSystem = (() => {
  const STORAGE_KEY = "domador_player";

  function gerarUUID() {
    return crypto.randomUUID();
  }

  function init() {
    let player = localStorage.getItem(STORAGE_KEY);

    if (!player) {
      const novoPlayer = {
        playerID: gerarUUID(),
        nome: "Domador",
        createdAt: Date.now(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(novoPlayer));
      return novoPlayer;
    }

    return JSON.parse(player);
  }

  function getPlayer() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  }

  return {
    init,
    getPlayer,
  };
})();
