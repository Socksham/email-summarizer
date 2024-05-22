"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const modules_1 = require("./modules");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8001;
app.use(express_1.default.json());
app.post("/generate-summary", modules_1.generateSummary);
app.post("/generate-suggestions", modules_1.generateSuggestions);
app.post("/analyze-email-for-interest", modules_1.analyzeEmailForInterest);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
