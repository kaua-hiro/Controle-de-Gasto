const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Permite que o empacotador reconheça arquivos WebAssembly do expo-sqlite na web
config.resolver.assetExts.push('wasm');

module.exports = config;