import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
    const { user_query } = req.body;

    if (!user_query) {
        return res.status(400).json({ error: 'No user_query provided' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [{ text: user_query }]
                }
            ]
        });

        const reply = result.response.text();
        res.json({ reply });
    } catch (error) {
        console.error("Gemini error:", error.message);
        res.status(500).json({ error: 'Failed to generate response', detail: error.message });
    }
});

export default router;
