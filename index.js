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

// SPRÁVNE: BEZ `new` pre SDK 1.6.x
const builder = addonBuilder(manifest);

builder.defineCatalogHandler(() => {
  return Promise.resolve({ metas: [] });
});

// Funkcia handler pre Vercel
module.exports = (req, res) => {
  // CORS pre Stremio (nutné pre manifest!)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.end();

  // Volaj Stremio handler
  builder.getInterface()(req, res);
};
