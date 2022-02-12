"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const download = require("download");
async function install() {
    const pluginsPath = (0, path_1.join)(__dirname, "../plugins");
    await (0, promises_1.mkdir)(pluginsPath);
    if (process.platform === "win32")
        await download("https://github.com/dev2alert/node-samp-streamer/releases/download/1.0.0/streamer.dll", pluginsPath);
    else
        await download("https://github.com/dev2alert/node-samp-streamer/releases/download/1.0.0/streamer.so", pluginsPath);
}
exports.install = install;
install();
