const { addonBuilder } = require("stremio-addon-sdk");
const axios = require("axios");
const cheerio = require("cheerio");

const manifest = {
  id: "org.streamuj.tv",
  version: "1.2.0",
  name: "StreamujTV (Sosac) Premium",
  description: "Addon pre prehrávanie streamuj.tv (Sosáč) podľa titulov z TMDB/Cinemeta",
  catalogs: [
    {
      type: "movie",
      id: "streamuj-catalog",
      name: "Streamuj.tv",
      extra: [{ name: "search" }]
    }
  ],
  resources: ["catalog", "stream"], // POZOR: musí tu byť aj "catalog"
  types: ["movie"],
  idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

// Oprava: pridať catalog handler!
builder.defineCatalogHandler((args) => {
  // Pre test prázdny katalóg, neskôr môžeš vrátiť filmy podľa args.extra.search
  return Promise.resolve({ metas: [] });
});

builder.defineStreamHandler(async ({ id }) => {
  try {
    // Simpel stream test
    return {
      streams: [{
        title: "Test Stream",
        url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      }]
    };
  } catch (e) {
    return { streams: [] };
  }
});

module.exports = builder.getInterface();
