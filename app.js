// Globala variabler
let dataPoints = [];
let analysisHistory = [];
let p5SketchInstance = null;
let tempPointData = null;
let clickedPosition = null;
let isModalOpen = false;
let sliderValue = 0;
let editingPointIndex = null;

// UI-element
const pointsList = document.getElementById('points-list');
const undoButton = document.getElementById('undo-button');
const resetButton = document.getElementById('reset-button');
const goalInput = document.getElementById('goal-input');
const suggestionModal = document.getElementById('suggestion-modal');
const noteModal = document.getElementById('note-modal');
const noteInput = document.getElementById('note-input');
const clickMarker = document.getElementById('click-marker');
const aiResponseModal = document.getElementById('ai-response-modal');
const aiResponseTitle = document.getElementById('ai-response-title');
const aiResponseText = document.getElementById('ai-response-text');
const aiLoadingSpinner = document.getElementById('ai-loading-spinner');
const aiQuestionInput = document.getElementById('ai-question-input');
const canvasContainer = document.getElementById('canvas-container');
const mainAdviceText = document.getElementById('main-advice-text');
const mainQuestionText = document.getElementById('main-question-text');
const dataSlider = document.getElementById('data-slider');
const sliderTime = document.getElementById('slider-time');
const analyzeDataButton = document.getElementById('analyze-data-button');
const askAiButton = document.getElementById('ask-ai-button');

// API-nyckel för Gemini API (Ska hanteras säkert på serversidan i produktion)
const API_KEY = "AIzaSyDmibgNIuPpd1girl8msyfMxnFqSzNWxAw";

// --- LOKAL LAGRING ---
function saveData() {
    localStorage.setItem('dataPoints', JSON.stringify(dataPoints));
    localStorage.setItem('analysisHistory', JSON.stringify(analysisHistory));
    localStorage.setItem('goal', goalInput.value);
}

function loadData() {
    const savedDataPoints = localStorage.getItem('dataPoints');
    const savedAnalysisHistory = localStorage.getItem('analysisHistory');
    const savedGoal = localStorage.getItem('goal');
    
    if (savedDataPoints) {
        dataPoints = JSON.parse(savedDataPoints);
    }
    if (savedAnalysisHistory) {
        analysisHistory = JSON.parse(savedAnalysisHistory);
        if (analysisHistory.length > 0) {
            const lastAnalysis = analysisHistory[analysisHistory.length - 1];
            updateMainAdviceBox(lastAnalysis.mainAdvice, lastAnalysis.mainQuestion);
        }
    }
    if (savedGoal) {
        goalInput.value = savedGoal;
    }
}

// --- P5.js SKETCH ---
const s = (p) => {
    let canvasWidth, canvasHeight;

    function getZoneFromCoordinates(x, y) {
        const col = Math.floor(p.map(x, 0, p.width, 0, 3));
        const row = Math.floor(p.map(y, 0, p.height, 0, 3));
        
        const zones = [
            ['Angest', 'Upphetsning', 'Flow'],
            ['Oro', 'Vardag', 'Kontroll'],
            ['Apati', 'Tristess', 'Avslappning']
        ];
        
        return zones[row][col];
    }

    function handleCanvasClick() {
        if (isModalOpen) {
            return;
        }
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            tempPointData = {
                x: p.mouseX,
                y: p.mouseY,
                zone: getZoneFromCoordinates(p.mouseX, p.mouseY)
            };
            clickedPosition = {x: p.mouseX, y: p.mouseY};
            p.redraw();
            showSuggestionModal(tempPointData.zone);
        }
    }
    
    p.windowResized = () => {
        const containerElement = document.getElementById('canvas-container');
        p.resizeCanvas(containerElement.offsetWidth, containerElement.offsetHeight);
        p.redraw();
    };

    p.setup = () => {
        const containerElement = document.getElementById('canvas-container');
        canvasWidth = containerElement.offsetWidth;
        canvasHeight = containerElement.offsetHeight;
        p.createCanvas(canvasWidth, canvasHeight).parent('canvas-container');
        p.background(55, 65, 81);
        p.noLoop();
        canvasContainer.addEventListener('click', handleCanvasClick);
    };

    p.draw = () => {
        p.background(55, 65, 81);
        drawGrid(p);
        
        const pointsToShowCount = sliderValue + 1;
        for (let i = 0; i < pointsToShowCount && i < dataPoints.length; i++) {
             drawPoint(p, dataPoints[i]);
        }
        
        if (clickedPosition) {
            clickMarker.style.left = `${clickedPosition.x}px`;
            clickMarker.style.top = `${clickedPosition.y}px`;
            clickMarker.classList.remove('hidden');
        } else {
            clickMarker.classList.add('hidden');
        }
    };
};

// --- DRAWING FUNCTIONS ---
function drawGrid(p) {
    p.stroke(75, 85, 99);
    p.strokeWeight(1);

    for (let i = 1; i < 3; i++) {
        p.line(p.width / 3 * i, 0, p.width / 3 * i, p.height);
        p.line(0, p.height / 3 * i, p.width, p.height / 3 * i);
    }
}

function drawPoint(p, point) {
    let pointColor;
    switch (point.mood) {
        case 'good': pointColor = p.color(16, 185, 129); break;
        case 'bad': pointColor = p.color(239, 68, 68); break;
        case 'neutral': pointColor = p.color(156, 163, 175); break;
        default: pointColor = p.color(255);
    }
    p.fill(pointColor);
    p.noStroke();
    p.ellipse(point.x, point.y, 10);
    
    if (point.note) {
        p.fill(255);
        p.textSize(10);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.text(point.note, point.x, point.y - 12);
    }
}

// --- UI LOGIC ---
function showSuggestionModal(zone) {
    isModalOpen = true;
    document.getElementById('suggestion-text').textContent = `Du är i zonen för "${zone}".`;
    suggestionModal.style.display = 'flex';
}

function closeSuggestionModal() {
    suggestionModal.style.display = 'none';
    isModalOpen = false;
    clickedPosition = null;
    tempPointData = null;
    p5SketchInstance.redraw();
}

function addPoint(mood) {
    if (!tempPointData) return;
    
    tempPointData.mood = mood;
    tempPointData.timestamp = Date.now();
    
    suggestionModal.style.display = 'none';
    showNoteModal();
}

function showNoteModal(index = null) {
    isModalOpen = true;
    editingPointIndex = index;
    noteModal.style.display = 'flex';
    
    if (index !== null && dataPoints[index] && dataPoints[index].note) {
        noteInput.value = dataPoints[index].note;
    } else {
        noteInput.value = '';
    }
    
    noteInput.focus();
}

function finalizePoint(note = '') {
    if (editingPointIndex !== null) {
        dataPoints[editingPointIndex].note = note.trim();
        editingPointIndex = null;
    } else if (tempPointData) {
        tempPointData.note = note.trim();
        dataPoints.push(tempPointData);
        tempPointData = null;
    }

    updateDataPointsList();
    updateSlider();
    saveData();
    
    noteInput.value = '';
    
    noteModal.style.display = 'none';
    clickedPosition = null;
    isModalOpen = false;
    p5SketchInstance.redraw();
}

function closeAIResponseModal() {
    aiResponseModal.style.display = 'none';
    isModalOpen = false;
}

function updateDataPointsList() {
    pointsList.innerHTML = '';
    for (let i = dataPoints.length - 1; i >= 0; i--) {
        const point = dataPoints[i];
        const pointElement = document.createElement('div');
        pointElement.className = `flex justify-between items-center p-2 rounded-md data-point cursor-pointer transition-colors ${i === sliderValue ? 'bg-blue-600' : ''}`;
        pointElement.classList.add(`mood-${point.mood}`);
        pointElement.dataset.index = i;
        
        pointElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(e.currentTarget.dataset.index);
            showNoteModal(index);
        });
        
        const date = new Date(point.timestamp);
        const timeString = date.toLocaleTimeString();
        
        const info = document.createElement('div');
        info.className = 'text-sm text-gray-200';
        info.textContent = `${timeString} - ${point.zone} (${point.mood})`;
        pointElement.appendChild(info);
        
        if (point.note) {
            const noteText = document.createElement('span');
            noteText.className = 'text-sm italic text-gray-400 truncate ml-2';
            noteText.textContent = `"${point.note}"`;
            pointElement.appendChild(noteText);
        }
        
        pointsList.appendChild(pointElement);
    }
    highlightActivePoint(sliderValue);
    p5SketchInstance.redraw();
}

function highlightActivePoint(index) {
    const allPoints = document.querySelectorAll('.data-point');
    allPoints.forEach(point => {
        point.classList.remove('bg-blue-600');
    });
    const activePoint = document.querySelector(`.data-point[data-index="${index}"]`);
    if (activePoint) {
        activePoint.classList.add('bg-blue-600');
    }
}

function updateMainAdviceBox(advice, question) {
    mainAdviceText.innerHTML = advice;
    mainQuestionText.innerHTML = question;
}

function updateSlider() {
    if (dataPoints.length > 0) {
        dataSlider.disabled = false;
        dataSlider.max = dataPoints.length - 1;
        dataSlider.value = dataPoints.length - 1;
        sliderValue = dataPoints.length - 1;
        
        updateSliderTimeDisplay();
    } else {
        dataSlider.disabled = true;
        dataSlider.max = 0;
        dataSlider.value = 0;
        sliderValue = 0;
        sliderTime.textContent = '';
    }
    updateDataPointsList();
}

function updateSliderTimeDisplay() {
    if (dataPoints.length > 0) {
        const selectedPoint = dataPoints[sliderValue];
        const timeString = new Date(selectedPoint.timestamp).toLocaleTimeString();
        sliderTime.textContent = `Tid: ${timeString}`;
    }
}

function updateCanvasWithSlider() {
    sliderValue = parseInt(dataSlider.value);
    updateSliderTimeDisplay();
    highlightActivePoint(sliderValue);
    p5SketchInstance.redraw();
}

function undoLastPoint() {
    if (dataPoints.length > 0) {
        dataPoints.pop();
        updateDataPointsList();
        updateSlider();
        saveData();
    }
}

function resetApp() {
    dataPoints = [];
    analysisHistory = [];
    goalInput.value = '';
    updateDataPointsList();
    updateMainAdviceBox('Vänta på din första analys för att få ditt huvudråd!', 'Vänta på din första analys för att få din huvudfråga!');
    updateSlider();
    p5SketchInstance.redraw();
    suggestionModal.style.display = 'none';
    noteModal.style.display = 'none';
    aiResponseModal.style.display = 'none';
    isModalOpen = false;
    clickedPosition = null;
    saveData();
}

// AI-relaterade funktioner
async function analyzeData() {
    if (isModalOpen) return;
    
    if (dataPoints.length === 0) {
        isModalOpen = true;
        showAIResponse("Analys av data", "Du har inga datapunkter att analysera än. Klicka på grafen för att lägga till din första punkt.");
        return;
    }

    isModalOpen = true;
    setAiButtonsDisabled(true);
    aiResponseTitle.textContent = "Analys av dina datapunkter";
    aiResponseText.innerHTML = "";
    aiLoadingSpinner.style.display = 'block';
    aiResponseModal.style.display = 'flex';

    let goal = goalInput.value.trim();
    let aiQuestion = aiQuestionInput.value.trim();

    let prompt = `Analysera följande datapunkter och anteckningar från en flow-matris.`;
    
    if (goal) {
        prompt += ` Din målsättning är: "${goal}".`
    }
    if (aiQuestion) {
         prompt += ` Användaren har också funderat över följande fråga som bakgrund: "${aiQuestion}".`
    }

    prompt += ` Ge en superkort, handlingsbar slutsats i ett enda stycke (**analysis**). Generera sedan ett kortfattat, övergripande råd som ett "mantra" som sammanfattar din rekommendation baserat på all data (**mainAdvice**). Avsluta med att skapa en öppen, reflekterande fråga (**mainQuestion**) som användaren kan ställa till sig själv för att fatta bättre beslut. Använd fetstil (**text**) för nyckelord i alla tre fält.`;
    
    if (analysisHistory.length > 0) {
        prompt += ` Tidigare analys: ${JSON.stringify(analysisHistory[analysisHistory.length - 1])}.`;
    }

    prompt += ` Datapunkter: ${JSON.stringify(dataPoints)}.`;

    const responseSchema = {
        type: "OBJECT",
        properties: {
            analysis: { type: "STRING" },
            mainAdvice: { type: "STRING" },
            mainQuestion: { type: "STRING" }
        },
        propertyOrdering: ["analysis", "mainAdvice", "mainQuestion"]
    };

    try {
        const result = await callGeminiAPI(prompt, responseSchema);
        const parsedResult = JSON.parse(result);

        analysisHistory.push(parsedResult);
        saveData();
        
        const formattedAnalysis = parsedResult.analysis.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        aiResponseText.innerHTML = `<p>${formattedAnalysis}</p>`;
        
        updateMainAdviceBox(parsedResult.mainAdvice.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'), parsedResult.mainQuestion.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));
    } catch (error) {
        aiResponseText.textContent = "Ett fel inträffade. Vänligen försök igen senare. Det kan bero på att AI:n inte kunde generera ett strukturerat svar.";
        console.error("AI analysis failed:", error);
    } finally {
        aiLoadingSpinner.style.display = 'none';
        setAiButtonsDisabled(false);
    }
}

async function askAI() {
    if (isModalOpen) return;
    
    const question = aiQuestionInput.value.trim();
    if (question === "") {
        isModalOpen = true;
        showAIResponse("Fråga AI", "Vänligen skriv en fråga först!");
        return;
    }

    if (dataPoints.length === 0) {
        isModalOpen = true;
        showAIResponse("Fråga AI", "Du har inga datapunkter att referera till i din fråga. Vänligen lägg till minst en punkt först.");
        return;
    }

    isModalOpen = true;
    setAiButtonsDisabled(true);
    aiResponseTitle.textContent = "Svar på din fråga";
    aiResponseText.textContent = "";
    aiLoadingSpinner.style.display = 'block';
    aiResponseModal.style.display = 'flex';

    let goal = goalInput.value.trim();
    let prompt = `Här är min historik av datapunkter och anteckningar från en flow-matris: ${JSON.stringify(dataPoints)}.`;
    
    if (goal) {
         prompt += ` Min målsättning är: "${goal}".`;
    }

    prompt += ` Svara kort på följande fråga: ${question}. Efter svaret, ge ett kortfattat, övergripande råd som ett "mantra" som sammanfattar din rekommendation baserat på all data (**mainAdvice**). Avsluta med att skapa en öppen, reflekterande fråga (**mainQuestion**) som användaren kan ställa till sig själv för att fatta bättre beslut. Använd fetstil (**text**) för nyckelord i alla tre fält.`;

    if (analysisHistory.length > 0) {
        prompt += ` Använd gärna den senaste analysen som kontext: ${JSON.stringify(analysisHistory[analysisHistory.length - 1])}.`;
    }
    
    const responseSchema = {
        type: "OBJECT",
        properties: {
            analysis: { type: "STRING" },
            mainAdvice: { type: "STRING" },
            mainQuestion: { type: "STRING" }
        },
        propertyOrdering: ["analysis", "mainAdvice", "mainQuestion"]
    };

    try {
        const result = await callGeminiAPI(prompt, responseSchema);
        const parsedResult = JSON.parse(result);

        analysisHistory.push(parsedResult);
        saveData();

        const formattedAnalysis = parsedResult.analysis.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        aiResponseText.innerHTML = `<p>${formattedAnalysis}</p>`;

        updateMainAdviceBox(parsedResult.mainAdvice.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'), parsedResult.mainQuestion.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));

    } catch (error) {
        aiResponseText.textContent = "Ett fel inträffade. Vänligen försök igen senare.";
        console.error("AI query failed:", error);
    } finally {
        aiLoadingSpinner.style.display = 'none';
        setAiButtonsDisabled(false);
    }
}

function showAIResponse(title, text) {
    aiResponseTitle.textContent = title;
    aiResponseText.textContent = text;
    aiLoadingSpinner.style.display = 'none';
    aiResponseModal.style.display = 'flex';
}

function setAiButtonsDisabled(disabled) {
    analyzeDataButton.disabled = disabled;
    askAiButton.disabled = disabled;
    if (disabled) {
        analyzeDataButton.classList.add('opacity-50', 'cursor-not-allowed');
        askAiButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        analyzeDataButton.classList.remove('opacity-50', 'cursor-not-allowed');
        askAiButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

async function callGeminiAPI(prompt, responseSchema = null) {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    if (responseSchema) {
        payload.generationConfig = {
            responseMimeType: "application/json",
            responseSchema: responseSchema
        };
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
    
    let response = null;
    let retryCount = 0;
    const maxRetries = 5;

    while (retryCount < maxRetries) {
        try {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.status === 429) {
                retryCount++;
                const delay = Math.pow(2, retryCount) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text;
            } else {
                throw new Error("Unexpected API response format");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            retryCount++;
            const delay = Math.pow(2, retryCount) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error("Failed to get a response from the API after multiple retries.");
}

// Event listeners
document.getElementById('mood-good').addEventListener('click', (e) => { e.stopPropagation(); addPoint('good'); });
document.getElementById('mood-bad').addEventListener('click', (e) => { e.stopPropagation(); addPoint('bad'); });
document.getElementById('mood-neutral').addEventListener('click', (e) => { e.stopPropagation(); addPoint('neutral'); });
document.getElementById('save-note-button').addEventListener('click', (e) => { e.stopPropagation(); finalizePoint(noteInput.value); });
document.getElementById('skip-note-button').addEventListener('click', (e) => { e.stopPropagation(); finalizePoint(); });
undoButton.addEventListener('click', (e) => { e.stopPropagation(); undoLastPoint(); });
resetButton.addEventListener('click', (e) => { e.stopPropagation(); resetApp(); });
document.getElementById('close-ai-response-button').addEventListener('click', (e) => { e.stopPropagation(); closeAIResponseModal(); });
analyzeDataButton.addEventListener('click', (e) => { e.stopPropagation(); analyzeData(); });
askAiButton.addEventListener('click', (e) => { e.stopPropagation(); askAI(); });
goalInput.addEventListener('input', saveData);

// Lyssnare för modalerna
suggestionModal.addEventListener('click', (e) => {
    if (e.target.id === 'suggestion-modal') {
        closeSuggestionModal();
    }
});

noteModal.addEventListener('click', (e) => {
    if (e.target.id === 'note-modal') {
        tempPointData = null; 
        noteInput.value = '';
        noteModal.style.display = 'none';
        clickedPosition = null;
        isModalOpen = false;
        p5SketchInstance.redraw();
    }
});

// Stoppa eventbubbling för de inre boxarna
document.getElementById('suggestion-box').addEventListener('click', (e) => e.stopPropagation());
document.getElementById('note-box').addEventListener('click', (e) => e.stopPropagation());

dataSlider.addEventListener('input', updateCanvasWithSlider);

// Starta skissen och ladda data när DOM är laddad
window.onload = function() {
    p5SketchInstance = new p5(s);
    loadData();
    updateSlider();
}
