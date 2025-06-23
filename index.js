const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  id: "org.streamuj.mini",
  version: "1.0.0",
  name: "Mini Streamuj Addon",
  description: "Testovaci addon pre nasadenie",
  types: ["movie"],
  idPrefixes: ["tt"],
  catalogs: [],
  resources: ["catalog"],
  contactEmail: "tvoj@email.com"
};

const builder = new addonBuilder(manifest);

// Dummy katalog handler (aj keď prázdny, musí byť definovaný)
builder.defineCatalogHandler(() => {
  return Promise.resolve({ metas: [] });
});

module.exports = builder.getInterface();
