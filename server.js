const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const SAVE_PATH = path.join(__dirname, "saves", "save.json");

// Criar pasta saves se não existir
if (!fs.existsSync(path.join(__dirname, "saves"))) {
    fs.mkdirSync(path.join(__dirname, "saves"));
}

// ===============================
// API SAVE
// ===============================

app.get("/api/save", (req, res) => {

    if (!fs.existsSync(SAVE_PATH)) {
        return res.json(null);
    }

    const data = fs.readFileSync(SAVE_PATH);
    res.json(JSON.parse(data));
});

app.post("/api/save", (req, res) => {

    const saveData = req.body;

    fs.writeFileSync(SAVE_PATH, JSON.stringify(saveData, null, 2));

    res.json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
