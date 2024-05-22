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
exports.analyzeEmailForInterest = exports.generateSuggestions = exports.generateSummary = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const openai_1 = require("@langchain/openai");
const runnables_1 = require("@langchain/core/runnables");
const output_parsers_1 = require("langchain/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../.env') });
if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key");
}
// OpenAIApi initialization
const openai = new openai_1.OpenAI({ apiKey: process.env.OPENAI_API_KEY, temperature: 0, modelName: "gpt-4-turbo" });
// Controller function to handle chat conversation
const generateSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract content from request body
        const content = req.body.content;
        if (typeof content !== 'string') {
            // If content is not a string, send a bad request response
            return res.status(400).json({ message: "Content must be a string." });
        }
        // List of topics of interest
        const parser = output_parsers_1.StructuredOutputParser.fromNamesAndDescriptions({
            summary: "Summary of the email body."
        });
        const chain = runnables_1.RunnableSequence.from([
            prompts_1.PromptTemplate.fromTemplate("Summarize the following email body.\n{format_instructions}\n\nContent: {email_body}"),
            openai,
            parser,
        ]);
        const response = yield chain.invoke({
            email_body: content,
            format_instructions: parser.getFormatInstructions(),
        });
        // Send response based on the AI's determination
        res.json({ Summary: response.summary });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.generateSummary = generateSummary;
const generateSuggestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract content from request body
        const content = req.body.content;
        if (typeof content !== 'string') {
            // If content is not a string, send a bad request response
            return res.status(400).json({ message: "Content must be a string." });
        }
        const chain = runnables_1.RunnableSequence.from([
            prompts_1.PromptTemplate.fromTemplate("Write three autocomplete suggestions for the following text body. If the body is undefined or empty, write three generic beginnings instead. The three suggestions must be separate items in a array labeled suggestions, and please use Javascript object notation to convey your answer. Do not use any code formatting please.\n\nBody: {email_body}"),
            openai
        ]);
        const response = yield chain.invoke({
            email_body: content
        });
        console.log(response);
        // Send response based on the AI's determination
        res.json(JSON.parse(response)); // parse string as JSON - since the langchain parser was not used
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.generateSuggestions = generateSuggestions;
const analyzeEmailForInterest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract content from request body
        const content = req.body.content;
        if (typeof content !== 'string') {
            return res.status(400).json({ message: "Content must be a string." });
        }
        // List of topics of interest
        const parser = output_parsers_1.StructuredOutputParser.fromNamesAndDescriptions({
            reasoning: "Your reasoning as to wether the email is related to a specific topic of interest.",
            decision: "One of 'Related' or 'Unrelated'.",
        });
        const chain = runnables_1.RunnableSequence.from([
            prompts_1.PromptTemplate.fromTemplate("Analyze the content of the following email body and determine whether it is related to the following topics of interest.\n{format_instructions}\n\nTopics of interest: {topics}\nContent: {email_body}"),
            openai,
            parser,
        ]);
        const response = yield chain.invoke({
            email_body: content,
            topics: "Machine learning",
            format_instructions: parser.getFormatInstructions(),
        });
        // Send response based on the AI's determination
        res.json({ isRelated: response.decision === "Related" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.analyzeEmailForInterest = analyzeEmailForInterest;
