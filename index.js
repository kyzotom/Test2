const { createServer } = require("http");
const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
  id: "org.streamuj.mini",
  version: "1.0.0",
  name: "Mini Streamuj Addon",
  description: "Testovací addon pre nasadenie",
  types: ["movie"],
  idPrefixes: ["tt"],
  catalogs: [],
  resources: ["catalog"],
  contactEmail: "kyzotom@gmail.com"
};

const builder = new addonBuilder(manifest);
builder.defineCatalogHandler(() => {
  return Promise.resolve({ metas: [] });
});

const interface = builder.getInterface();

module.exports = (req, res) => {
  interface(req, res);
};
