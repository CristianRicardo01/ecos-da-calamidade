window.onload = () => {
    BootSystem.iniciar();
};

async function confirmarCriacao() {

    const nome = document.getElementById("nomeInput").value.trim();

    if (!nome) return alert("Digite um nome!");

    const player = PlayerSystem.criarNovoPlayer(nome);

    await ApiSystem.salvarSave(player);

    iniciarJogo(player);
}

function iniciarJogo(save) {

    document.getElementById("app").innerHTML = `
        <h2>Bem-vindo, ${save.nome}</h2>
        <p>Nível: ${save.nivel}</p>
        <p>Energia Espiritual: ${save.energiaEspiritual}</p>
        <p>Pedras Espirituais: ${save.pedrasEspirituais}</p>
    `;
}
