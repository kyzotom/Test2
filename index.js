const app = require("express")();
const port = process.env.PORT || 3000;
const addonInterface = builder.getInterface();

app.get("/manifest.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(addonInterface.manifest);
});

app.get("/:resource/:type/:id/:extra?.json?", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { resource, type, id } = req.params;
    const extra = req.query;

    const handler = addonInterface.get(resource);
    if (handler) {
        try {
            const result = await handler({ type, id, extra });
            res.send(result);
        } catch (err) {
            res.status(500).send({ err: err.message });
        }
    } else {
        res.status(404).send({ err: "Not found" });
    }
});

// 🟢 Tento riadok je pre lokálne testovanie
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Addon listening on port ${port}`);
    });
}

// 🟢 Tento riadok je pre Vercel
module.exports = app; // ← NESMIE chýbať!
