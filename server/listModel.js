import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`
        );

        const models = response.data.models;
        console.log("✅ Available Gemini Models:");
        models.forEach(model => {
            console.log(`- ${model.name}`);
        });
    } catch (error) {
        console.error("❌ Failed to fetch model list:", error.response?.data || error.message);
    }
}

listModels();
