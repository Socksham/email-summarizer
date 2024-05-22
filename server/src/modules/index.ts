import { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { OpenAI } from "@langchain/openai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key");
}

// OpenAIApi initialization
const openai = new OpenAI({apiKey : process.env.OPENAI_API_KEY, temperature : 0, modelName : "gpt-4-turbo"});

// Controller function to handle chat conversation
export const generateSummary = async (req: Request, res: Response) => {
  try {
    // Extract content from request body
        const content = req.body.content;

        if (typeof content !== 'string') {
            // If content is not a string, send a bad request response
            return res.status(400).json({ message: "Content must be a string." });
        }
        // List of topics of interest
      const parser = StructuredOutputParser.fromNamesAndDescriptions({
        summary: "Summary of the email body."});

      const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate(
          "Summarize the following email body.\n{format_instructions}\n\nContent: {email_body}"
        ),
        openai,
        parser,
      ]);

      const response = await chain.invoke({
        email_body: content,
        format_instructions: parser.getFormatInstructions(),
      });

      // Send response based on the AI's determination
      res.json({ Summary: response.summary});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const generateSuggestions = async (req: Request, res: Response) => {
  try {
    // Extract content from request body
        const content = req.body.content;

        if (typeof content !== 'string') {
            // If content is not a string, send a bad request response
            return res.status(400).json({ message: "Content must be a string." });
        }

      const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate(
          "Write three autocomplete suggestions for the following text body. If the body is undefined or empty, write three generic beginnings instead. The three suggestions must be separate items in a array labeled suggestions, and please use Javascript object notation to convey your answer. Do not use any code formatting please.\n\nBody: {email_body}"
        ),
        openai
      ]);

      const response = await chain.invoke({
        email_body: content
      });

      console.log(response)
      // Send response based on the AI's determination
      res.json(JSON.parse(response)); // parse string as JSON - since the langchain parser was not used
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const analyzeEmailForInterest = async (req: Request, res: Response) => {
  try {
      // Extract content from request body
      const content = req.body.content;

      if (typeof content !== 'string') {
          return res.status(400).json({ message: "Content must be a string." });
      }

      // List of topics of interest
      const parser = StructuredOutputParser.fromNamesAndDescriptions({
        reasoning: "Your reasoning as to wether the email is related to a specific topic of interest.",
        decision: "One of 'Related' or 'Unrelated'.",
      });

      const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate(
          "Analyze the content of the following email body and determine whether it is related to the following topics of interest.\n{format_instructions}\n\nTopics of interest: {topics}\nContent: {email_body}"
        ),
        openai,
        parser,
      ]);

      
      const response = await chain.invoke({
        email_body: content,
        topics: "Machine learning",
        format_instructions: parser.getFormatInstructions(),
      });

      // Send response based on the AI's determination
      res.json({ isRelated: response.decision === "Related"});
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
  }
};
