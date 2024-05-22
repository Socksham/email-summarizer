"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSummary = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = __importDefault(require("openai"));
dotenv_1.default.config();
if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key");
}
// OpenAIApi initialization
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
// Controller function to handle chat conversation
const generateSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract content from request body
        const content = req.body.content;
        if (typeof content !== 'string') {
            // If content is not a string, send a bad request response
            return res.status(400).json({ message: "Content must be a string." });
        }
        const completion = yield openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Summarize the following email body: ",
                },
                { role: "user", content: content },
            ],
            model: "gpt-3.5-turbo-0125",
        });
        const responseText = completion.choices[0].message.content;
        res.send({ response: responseText });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.generateSummary = generateSummary;
