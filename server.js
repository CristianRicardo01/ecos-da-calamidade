const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const SAVE_DIR = path.join(__dirname, "saves");
const SAVE_PATH = path.join(SAVE_DIR, "save.json");

// Garantir que a pasta saves exista
if (!fs.existsSync(SAVE_DIR)) {
    fs.mkdirSync(SAVE_DIR);
}

// ======================
// API
// ======================

app.get("/api/save", (req, res) => {

    try {
        if (!fs.existsSync(SAVE_PATH)) {
            return res.json(null);
        }

        const data = fs.readFileSync(SAVE_PATH, "utf-8");

        if (!data) {
            return res.json(null);
        }

        res.json(JSON.parse(data));

    } catch (error) {
        console.error("Erro ao ler save:", error);
        res.status(500).json({ error: "Erro interno" });
    }
});

app.post("/api/save", (req, res) => {

    try {
        fs.writeFileSync(SAVE_PATH, JSON.stringify(req.body, null, 2));
        res.json({ status: "ok" });

    } catch (error) {
        console.error("Erro ao salvar:", error);
        res.status(500).json({ error: "Erro ao salvar" });
    }
});

// ======================
// STATIC (SEMPRE POR ÚLTIMO)
// ======================

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
