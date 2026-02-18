window.onload = () => {
  BootSystem.iniciar();
};

function iniciarJogo() {
  const player = PlayerSystem.getPlayer();
  const save = SaveSystem.loadSave(player.playerID);

  document.getElementById("app").innerHTML = `
        <h2>Bem-vindo, ${player.nome}</h2>
        <p>Nível: ${save.nivel}</p>
        <p>Energia Espiritual: ${save.energiaEspiritual}</p>
        <p>Pedras Espirituais: ${save.pedrasEspirituais}</p>
    `;
}
