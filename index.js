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

const builder = addonBuilder(manifest);

builder.defineCatalogHandler(() => {
  return Promise.resolve({ metas: [] });
});

const interface = builder.getInterface();

// SPRÁVNY serverless handler pre Vercel + Stremio SDK >=1.6.x:
module.exports = (req, res) => {
  // CORS headers (potrebné pre Stremio)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.end();

  // Hlavná vec: interface je OBJEKT s .requestHandler!
  return interface.requestHandler(req, res);
};
