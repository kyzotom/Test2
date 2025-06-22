const { addonBuilder } = require("stremio-addon-sdk");
const express = require("express");

const manifest = {
    id: "org.test.minimal",
    version: "1.0.0",
    name: "Minimal Test Addon",
    description: "Minimalny addon pre test manifestu",
    catalogs: [
        {
            type: "movie",
            id: "test",
            name: "Test Catalog",
            extra: [{ name: "search", isRequired: false }]
        }
    ],
    resources: ["catalog"],
    types: ["movie"],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineCatalogHandler(({ type, id, extra }) => {
    return Promise.resolve({ metas: [] });
});

const app = express();
const addonInterface = builder.getInterface();

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send('<h3>✅ Minimal Addon beží. <a href="/manifest.json">Manifest tu</a></h3>');
});

app.get("/manifest.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(addonInterface.manifest);
});

module.exports = app;