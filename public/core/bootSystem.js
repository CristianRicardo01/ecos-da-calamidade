const BootSystem = (() => {
  async function iniciar() {
    mostrarBoot();

    await delay(1500);

    let save = await ApiSystem.carregarSave();

    // 1️⃣ Se não existe save
    if (!save) {
      mostrarCriacaoPlayer();
      return;
    }

    // 2️⃣ Se existe mas NÃO tem mascote
    if (!save.mascote) {
      mostrarEscolhaMascoteExistente(save);
      return;
    }

    // 3️⃣ Aplicar tempo offline
    save = aplicarTempoOffline(save);
    await ApiSystem.salvarSave(save);

    iniciarJogo(save);
  }

  function mostrarEscolhaMascoteExistente(save) {
    document.getElementById("app").innerHTML = `
    <h2>${save.nome}, escolha sua Fera Espiritual</h2>

    <div class="pet-container">

      ${criarCardMascote({
        id: "LUMIFELIS",
        nome: "Lumifelis",
        raridade: "raro",
        descricao: "+20% produção de pedras",
      })}

      ${criarCardMascote({
        id: "TERRAGOR",
        nome: "Terragor",
        raridade: "raro",
        descricao: "+1 pedra por ciclo",
      })}

      ${criarCardMascote({
        id: "IGNIVAR",
        nome: "Ignivar",
        raridade: "raro",
        descricao: "Dobra produção offline",
      })}

    </div>
  `;
  }

  function criarCardMascote({ id, nome, raridade, descricao }) {
    return `
    <div class="card-container mt-9 ${raridade}" onclick="confirmarMascoteExistente('${id}')">

      <div class="inner-container">
          <div class="border-outer">
              <div class="main-card"></div>
          </div>
          <div class="glow-layer-1"></div>
          <div class="glow-layer-2"></div>
      </div>

      <div class="overlay-1"></div>
      <div class="overlay-2"></div>
      <div class="background-glow"></div>

      <div class="content-container">
          <div class="content-top">
              <div class="scrollbar-glass">
                  ${raridade.toUpperCase()}
              </div>

              <div style="flex:1; display:flex; align-items:center; justify-content:center;">
                  <img src="assets/pets/${id}/portrait_1.png" class="pet-image">
              </div>

              <p class="title">${nome}</p>
          </div>

          <hr class="divider" />

          <div class="content-bottom">
              <p class="description">${descricao}</p>
          </div>
      </div>
    </div>
  `;
  }

  // 🔥 FUNÇÃO NORMAL (não static)
  function aplicarTempoOffline(save) {
    const agora = Date.now();

    if (!save.ultimoLogin) {
      save.ultimoLogin = agora;
      return save;
    }

    const tempoPassado = agora - save.ultimoLogin;

    const segundos = Math.floor(tempoPassado / 1000);

    const taxaProducao = 1 / 5;

    if (save.mascote?.id === "IGNIVAR") {
      taxaProducao *= 2;
    }

    const pedrasGeradas = Math.floor(segundos * taxaProducao);

    save.ultimoLogin = agora;

    if (pedrasGeradas > 0) {
      save.pedrasEspirituais += pedrasGeradas;

      mostrarPopupOffline(pedrasGeradas, segundos);
    }

    return save;
  }

  function mostrarPopupOffline(pedras, tempo) {
    const horas = Math.floor(tempo / 3600);
    const minutos = Math.floor((tempo % 3600) / 60);
    const segundos = tempo % 60;

    const tempoFormatado = `${horas}h ${minutos}m ${segundos}s`;

    const popup = document.createElement("div");
    popup.className = "popup-offline";

    popup.innerHTML = `
        <div class="popup-content">
            <h2>🌙 Energia Coletada</h2>
            <p>Você esteve ausente por:</p>
            <strong>${tempoFormatado}</strong>
            <p>Pedras Espirituais geradas:</p>
            <h3>💎 +${pedras}</h3>
            <button onclick="this.parentElement.parentElement.remove()">Continuar</button>
        </div>
    `;

    document.body.appendChild(popup);
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
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function irParaEscolhaMascote() {
    const nome = document.getElementById("nomeInput").value;

    if (!nome) {
      alert("Escolha um nome espiritual.");
      return;
    }

    document.getElementById("app").innerHTML = `
        <h2>Escolha sua Fera Espiritual</h2>

        <div class="pet-card raro" onclick="confirmarMascote('${nome}', 'LUMIFELIS')">
            <h3>🐱 Lumifelis</h3>
            <p>Raridade: Raro</p>
            <p>+20% produção de pedras</p>
        </div>

        <div class="pet-card comum" onclick="confirmarMascote('${nome}', 'TERRAGOR')">
            <h3>🌿 Terragor</h3>
            <p>Raridade: Comum</p>
            <p>+1 pedra por ciclo</p>
        </div>

        <div class="pet-card epico" onclick="confirmarMascote('${nome}', 'IGNIVAR')">
            <h3>🔥 Ignivar</h3>
            <p>Raridade: Épico</p>
            <p>Dobra produção offline</p>
        </div>
    `;
  }

  return {
    iniciar,
  };
})();
