const ApiSystem = (() => {

    async function carregarSave() {
        const response = await fetch("/api/save");
        return await response.json();
    }

    async function salvarSave(data) {
        await fetch("/api/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }

    return {
        carregarSave,
        salvarSave
    };

})();
