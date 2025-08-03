// Importera nödvändiga moduler
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware för att hantera JSON-förfrågningar
app.use(express.json());

// Sätt upp din API-proxy-endpoint
// Denna endpoint tar emot förfrågningar från din frontend
app.post('/api/gemini-proxy', async (req, res) => {
    // Hämta API-nyckeln från miljövariabler (SÄKERT SÄTT)
    const apiKey = process.env.GOOGLE_API_KEY;

    // Om API-nyckeln saknas, svara med ett fel
    if (!apiKey) {
        return res.status(500).json({ error: 'Server could not find API key.' });
    }

    // Hämta prompten och schema från frontend-förfrågan
    const { prompt, responseSchema } = req.body;
    
    // Konstruera payload för Google Gemini API
    const chatHistory = [{ role: 'user', parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };

    // Om frontend skickade ett schema för strukturerad data, lägg till det i payload
    if (responseSchema) {
        payload.generationConfig = {
            responseMimeType: 'application/json',
            responseSchema: responseSchema
        };
    }

    // Bygg URL:en till Gemini API:et med din säkra API-nyckel
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // Anropa Gemini API:et
    try {
        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            throw new Error(errorData.error.message || `API error: status ${apiResponse.status}`);
        }

        const result = await apiResponse.json();
        
        // Extrahera och skicka tillbaka texten från svaret
        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            return res.json({ text: text });
        } else {
            throw new Error("Unexpected API response format");
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to process request.' });
    }
});

// Serverar frontend-filen (realitycheck.html) för enklare lokal körning
app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'realitycheck.html'));
});

// Starta servern
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
