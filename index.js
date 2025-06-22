const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "org.stremio.mini",
    version: "1.0.0",
    name: "Mini Addon",
    description: "Minimal Stremio addon example",
    catalogs: [],
    resources: [],
    types: [],
    idPrefixes: []
};

const builder = new addonBuilder(manifest);
module.exports = builder.getInterface();