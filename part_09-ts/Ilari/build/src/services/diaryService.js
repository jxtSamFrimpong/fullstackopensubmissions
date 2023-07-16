"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entries_json_1 = __importDefault(require("../../data/entries.json"));
const diaries = entries_json_1.default;
const getEntries = () => {
    return diaries;
};
const addDiary = () => {
    return null;
};
exports.default = {
    getEntries,
    addDiary
};
