import express from "express";
import dotenv from "dotenv";
import { analyzeEmailForInterest, generateSummary, generateSuggestions } from "./modules";

dotenv.config();

const app = express();
const port = 8001;
app.use(express.json());


app.post("/generate-summary", generateSummary);

app.post("/generate-suggestions", generateSuggestions);

app.post("/analyze-email-for-interest", analyzeEmailForInterest);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
