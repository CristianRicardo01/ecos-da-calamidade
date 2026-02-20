window.onload = () => {
  BootSystem.iniciar();
};

let idleFrame = 1;
let idleInterval = null;

function iniciarIdleAnimacao(player) {
  const sprite = document.getElementById("petSprite");

  if (!sprite || !player?.mascote?.id) return;

  if (idleInterval) clearInterval(idleInterval);

  idleInterval = setInterval(() => {
    idleFrame++;
    if (idleFrame > 3) idleFrame = 1;

    sprite.src = `assets/pets/${player.mascote.id}/idle_${idleFrame}.png`;
  }, 400);
}

async function confirmarCriacao() {
  const nome = document.getElementById("nomeInput").value.trim();

  if (!nome) return alert("Digite um nome!");

  const player = PlayerSystem.criarNovoPlayer(nome);

  // ⚠️ NÃO iniciar o jogo ainda
  await ApiSystem.salvarSave(player);

  // 🔁 Forçar reload para o BootSystem decidir o fluxo
  location.reload();
}

function iniciarJogo(save) {
  document.getElementById("app").innerHTML = `
    <div class="game-world">

        <div class="hud">
            <strong>${save.nome}</strong><br>
            Nível: ${save.nivel} <br>
            Energia: ${save.energiaEspiritual} <br>
            Pedras: ${save.pedrasEspirituais}
        </div>

        <div class="portal-area" onclick="explorar()"></div>

        <div class="farm-area" onclick="abrirCultivo()">
            🌱 Campo de Cultivo
        </div>

        <div class="pet-area">
            <img id="petSprite"
                 class="pet-sprite"
                 src="assets/pets/${save.mascote.id}/idle_1.png">
        </div>

    </div>
  `;

  iniciarIdleAnimacao(save);
}

async function confirmarMascote(nome, mascote) {
  const novoSave = {
    playerID: crypto.randomUUID(),
    nome: nome,
    createdAt: Date.now(),
    nivel: 1,
    energiaEspiritual: 10,
    pedrasEspirituais: 0,
    ultimoLogin: Date.now(),
    mascote: {
      id: mascote,
      raridade: obterRaridade(mascote),
      imagem: pegarImagemAleatoriaPet(mascote),
    },
  };

  await ApiSystem.salvarSave(novoSave);

  location.reload();
}

async function confirmarMascoteExistente(mascoteID) {
  let save = await ApiSystem.carregarSave();

  save.mascote = {
    id: mascoteID,
    raridade: obterRaridade(mascoteID),
    estadoAtual: "idle",
    nivel: 1,
    exp: 0,
  };

  await ApiSystem.salvarSave(save);

  location.reload();
}

function pegarImagemAleatoriaPet(petID) {
  return `assets/pets/${petID}/portrait_1.png`;
}

function obterRaridade(petID) {
  const raridades = {
    LUMIFELIS: "raro",
    TERRAGOR: "comum",
    IGNIVAR: "epico",
  };

  return raridades[petID];
}

function explorar() {
  alert("Sistema de exploração ainda não implementado.");
}

function abrirCultivo() {
  alert("Sistema de cultivo em desenvolvimento.");
}