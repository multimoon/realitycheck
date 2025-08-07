// Globala variabler
let allSessions = [];
let currentSessionIndex = 0;
let p5SketchInstance = null;
let tempPointData = null;
let clickedPosition = null;
let isModalOpen = false;
let sliderValue = 0;
let editingPointIndex = null;
let flashingInterval = null;

// UI-element
const pointsList = document.getElementById('points-list');
const undoButton = document.getElementById('undo-button');
const resetButton = document.getElementById('reset-button');
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
const sliderContainer = document.getElementById('slider-container');

// NEW UI elements for goal management
const activeGoalText = document.getElementById('active-goal-text');
const goalManagementModal = document.getElementById('goal-management-modal');
const closeGoalManagementButton = document.getElementById('close-goal-management-button');
const goalList = document.getElementById('goal-list');
const newGoalInput = document.getElementById('new-goal-input');
const addGoalButton = document.getElementById('add-goal-button');

// NEW UI elements for goal navigation
const prevGoalButton = document.getElementById('prev-goal-button');
const nextGoalButton = document.getElementById('next-goal-button');

// NEW UI elements for intro toggle
const toggleIntroButton = document.getElementById('toggle-intro-button');
const introContent = document.getElementById('intro-content');
const toggleIcon = document.getElementById('toggle-icon');
const headerContent = document.getElementById('header-content'); // New element to reference

// API-nyckel för Gemini API (Ska hanteras säkert på serversidan i produktion)
const API_KEY = "AIzaSyDmibgNIuPpd1girl8msyfMxnFqSzNWxAw";

// --- LOKAL LAGRING ---
function saveData() {
    localStorage.setItem('allSessions', JSON.stringify(allSessions));
    localStorage.setItem('currentSessionIndex', currentSessionIndex);
}

function loadData() {
    const savedSessions = localStorage.getItem('allSessions');
    const savedIndex = localStorage.getItem('currentSessionIndex');
    
    if (savedSessions) {
        allSessions = JSON.parse(savedSessions);
        if (savedIndex !== null) {
            currentSessionIndex = parseInt(savedIndex);
        }
        if (allSessions.length === 0) {
            createNewSession('Mitt första mål');
        }
    } else {
        createNewSession('Mitt första mål');
    }
    
    updateUIForCurrentSession();
}

// --- SESSION MANAGEMENT FUNCTIONS ---
function createNewSession(goalName) {
    const newSession = {
        goal: goalName,
        dataPoints: [],
        analysisHistory: []
    };
    allSessions.push(newSession);
    currentSessionIndex = allSessions.length - 1;
    saveData();
    updateUIForCurrentSession();
    updateGoalListInModal();
}

function switchSession(index) {
    currentSessionIndex = parseInt(index);
    saveData();
    updateUIForCurrentSession();
    closeGoalManagementModal();
}

function goToPrevSession() {
    if (allSessions.length > 1) {
        currentSessionIndex = (currentSessionIndex - 1 + allSessions.length) % allSessions.length;
        saveData();
        updateUIForCurrentSession();
    }
}

function goToNextSession() {
    if (allSessions.length > 1) {
        currentSessionIndex = (currentSessionIndex + 1) % allSessions.length;
        saveData();
        updateUIForCurrentSession();
    }
}

function deleteSession(index) {
    if (allSessions.length > 1) {
        if (confirm(`Är du säker på att du vill ta bort målet "${allSessions[index].goal}"?`)) {
            allSessions.splice(index, 1);
            currentSessionIndex = Math.max(0, currentSessionIndex - 1);
            saveData();
            updateGoalListInModal();
            updateUIForCurrentSession();
        }
    } else {
        alert('Du kan inte ta bort det sista målet. Skapa ett nytt först om du vill byta!');
    }
}

function updateUIForCurrentSession() {
    const currentSession = allSessions[currentSessionIndex];
    
    activeGoalText.textContent = currentSession.goal;
    
    // Toggle navigation arrows based on the number of sessions
    if (allSessions.length > 1) {
        prevGoalButton.classList.remove('hidden');
        nextGoalButton.classList.remove('hidden');
    } else {
        prevGoalButton.classList.add('hidden');
        nextGoalButton.classList.add('hidden');
    }
    
    // Now, `dataPoints` and `analysisHistory` refer to the current session's data
    dataPoints = currentSession.dataPoints; 
    analysisHistory = currentSession.analysisHistory;
    
    updateDataPointsList();
    updateSlider();
    p5SketchInstance.redraw();
    
    if (currentSession.analysisHistory.length > 0) {
        const lastAnalysis = currentSession.analysisHistory[currentSession.analysisHistory.length - 1];
        updateMainAdviceBox(lastAnalysis.mainAdvice, lastAnalysis.mainQuestion);
    } else {
        updateMainAdviceBox('Vänta på din första analys för att få ditt huvudråd!', 'Vänta på din första analys för att få din huvudfråga!');
    }
}

function showGoalManagementModal() {
    isModalOpen = true;
    updateGoalListInModal();
    goalManagementModal.style.display = 'flex';
}

function closeGoalManagementModal() {
    isModalOpen = false;
    goalManagementModal.style.display = 'none';
    newGoalInput.value = '';
}

function updateGoalListInModal() {
    goalList.innerHTML = '';
    allSessions.forEach((session, index) => {
        const goalItem = document.createElement('div');
        goalItem.className = 'bg-gray-700 p-3 rounded-lg flex items-center space-x-2 transition-colors';
        if (index === currentSessionIndex) {
            goalItem.classList.add('bg-blue-600', 'hover:bg-blue-700');
        } else {
            goalItem.classList.add('hover:bg-gray-600', 'cursor-pointer');
        }

        const goalNameSpan = document.createElement('span');
        goalNameSpan.className = 'flex-1 text-white truncate';
        goalNameSpan.textContent = session.goal || `Mål ${index + 1}`;
        goalItem.appendChild(goalNameSpan);
        
        if (index !== currentSessionIndex) {
            goalItem.addEventListener('click', () => switchSession(index));
        }

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'w-full p-2 bg-gray-600 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden';
        editInput.value = session.goal;
        goalItem.appendChild(editInput);
        
        const editButton = document.createElement('button');
        editButton.className = 'p-1 text-gray-400 hover:text-white';
        editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" /></svg>`;
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (editInput.classList.contains('hidden')) {
                goalNameSpan.classList.add('hidden');
                editInput.classList.remove('hidden');
                editInput.focus();
            } else {
                goalNameSpan.classList.remove('hidden');
                editInput.classList.add('hidden');
                session.goal = editInput.value;
                saveData();
                updateUIForCurrentSession();
                updateGoalListInModal(); // Uppdatera listan omedelbart
            }
        });
        goalItem.appendChild(editButton);
        
        editInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                editButton.click();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'p-1 text-gray-400 hover:text-red-500';
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`;
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteSession(index);
        });
        if (allSessions.length > 1) {
             goalItem.appendChild(deleteButton);
        }

        goalList.appendChild(goalItem);
    });
}


// --- P5.js SKETCH ---
const s = (p) => {
    let canvasWidth, canvasHeight;

    function getZoneFromCoordinates(x, y) {
        const col = Math.floor(p.map(x, 0, p.width, 0, 3));
        const row = Math.floor(p.map(y, 0, p.height, 0, 3));
        
        const zones = [
            ['Ångest', 'Upphetsning', 'Flow'],
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
        
        const currentSessionDataPoints = allSessions[currentSessionIndex] ? allSessions[currentSessionIndex].dataPoints : [];
        const pointsToShowCount = sliderValue + 1;
        for (let i = 0; i < pointsToShowCount && i < currentSessionDataPoints.length; i++) {
             drawPoint(p, currentSessionDataPoints[i]);
        }
        
        if (clickedPosition) {
            // Flytta 10px upp och 10px åt vänster
            clickMarker.style.left = `${clickedPosition.x - 11}px`;
            clickMarker.style.top = `${clickedPosition.y - 12}px`;
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
    
    const currentSessionDataPoints = allSessions[currentSessionIndex].dataPoints;
    if (index !== null && currentSessionDataPoints[index] && currentSessionDataPoints[index].note) {
        noteInput.value = currentSessionDataPoints[index].note;
    } else {
        noteInput.value = '';
    }
    
}

function finalizePoint(note = '') {
    const currentSession = allSessions[currentSessionIndex];

    if (editingPointIndex !== null) {
        currentSession.dataPoints[editingPointIndex].note = note.trim();
        editingPointIndex = null;
    } else if (tempPointData) {
        tempPointData.note = note.trim();
        currentSession.dataPoints.push(tempPointData);
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
    const currentSession = allSessions[currentSessionIndex];
    pointsList.innerHTML = '';
    // Visa de senaste först
    const reversedDataPoints = [...currentSession.dataPoints].reverse(); 
    reversedDataPoints.forEach((point, i) => {
        const pointElement = document.createElement('div');
        pointElement.className = `flex justify-between items-center p-2 rounded-md data-point cursor-pointer transition-colors mood-${point.mood}-border`;
        pointElement.dataset.index = currentSession.dataPoints.length - 1 - i; // Original index
        
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
    });
    highlightActivePoint(sliderValue);
    p5SketchInstance.redraw();
    
    if (currentSession.dataPoints.length > 0) {
        undoButton.classList.remove('hidden');
        resetButton.classList.remove('hidden');
    } else {
        undoButton.classList.add('hidden');
        resetButton.classList.add('hidden');
    }
}

function highlightActivePoint(index) {
    const allPoints = document.querySelectorAll('.data-point');
    allPoints.forEach(point => {
        point.classList.remove('bg-gray-600');
    });
    const activePoint = document.querySelector(`.data-point[data-index="${index}"]`);
    if (activePoint) {
        activePoint.classList.add('bg-gray-600');
    }
}

function updateMainAdviceBox(advice, question) {
    mainAdviceText.innerHTML = advice.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    mainQuestionText.innerHTML = question.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function updateSlider() {
    const currentSessionDataPoints = allSessions[currentSessionIndex].dataPoints;

    if (currentSessionDataPoints.length > 0) {
        sliderContainer.classList.remove('hidden');
        dataSlider.disabled = false;
        dataSlider.max = currentSessionDataPoints.length - 1;
        dataSlider.value = currentSessionDataPoints.length - 1;
        sliderValue = currentSessionDataPoints.length - 1;
        
        updateSliderTimeDisplay();
    } else {
        sliderContainer.classList.add('hidden');
        dataSlider.disabled = true;
        dataSlider.max = 0;
        dataSlider.value = 0;
        sliderValue = 0;
        sliderTime.textContent = '';
    }
    updateDataPointsList();
}

function updateSliderTimeDisplay() {
    const currentSessionDataPoints = allSessions[currentSessionIndex].dataPoints;

    if (currentSessionDataPoints.length > 0) {
        const selectedPoint = currentSessionDataPoints[sliderValue];
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
    const currentSession = allSessions[currentSessionIndex];
    if (currentSession.dataPoints.length > 0) {
        currentSession.dataPoints.pop();
        updateDataPointsList();
        updateSlider();
        saveData();
    }
}

function resetApp() {
    if (confirm('Är du säker på att du vill nollställa ALL data för det här målet?')) {
        const currentSession = allSessions[currentSessionIndex];
        currentSession.dataPoints = [];
        currentSession.analysisHistory = [];
        currentSession.goal = 'Nytt mål';

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
        updateUIForCurrentSession();
    }
}

// AI-relaterade funktioner
async function analyzeData() {
    if (isModalOpen) return;
    
    const currentSession = allSessions[currentSessionIndex];

    if (currentSession.dataPoints.length === 0) {
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

    let goal = currentSession.goal.trim();
    let aiQuestion = aiQuestionInput.value.trim();

    let prompt = `Analysera följande datapunkter och anteckningar från en flow-matris.`;
    
    if (goal) {
        prompt += ` Din målsättning är: "${goal}".`
    }
    if (aiQuestion) {
         prompt += ` Användaren har också funderat över följande fråga som bakgrund: "${aiQuestion}".`
    }

    prompt += ` Ge en superkort, handlingsbar slutsats i ett enda stycke (**analysis**). Generera sedan ett kortfattat, övergripande råd som ett "mantra" som sammanfattar din rekommendation baserad på all data (**mainAdvice**). Avsluta med att skapa en öppen, reflekterande fråga (**mainQuestion**) som användaren kan ställa till sig själv för att fatta bättre beslut. Använd fetstil (**text**) för nyckelord i alla tre fält.`;
    
    if (currentSession.analysisHistory.length > 0) {
        prompt += ` Tidigare analys: ${JSON.stringify(currentSession.analysisHistory[currentSession.analysisHistory.length - 1])}.`;
    }

    prompt += ` Datapunkter: ${JSON.stringify(currentSession.dataPoints)}.`;

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

        currentSession.analysisHistory.push(parsedResult);
        saveData();
        
        const formattedAnalysis = parsedResult.analysis.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        aiResponseText.innerHTML = `<p>${formattedAnalysis}</p>`;
        
        updateMainAdviceBox(parsedResult.mainAdvice, parsedResult.mainQuestion);
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

    const currentSession = allSessions[currentSessionIndex];
    if (currentSession.dataPoints.length === 0) {
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

    let goal = currentSession.goal.trim();
    let prompt = `Här är min historik av datapunkter och anteckningar från en flow-matris: ${JSON.stringify(currentSession.dataPoints)}.`;
    
    if (goal) {
         prompt += ` Min målsättning är: "${goal}".`;
    }

    prompt += ` Svara kort på följande fråga: ${question}. Efter svaret, ge ett kortfattat, övergripande råd som ett "mantra" som sammanfattar din rekommendation baserad på all data (**mainAdvice**). Avsluta med att skapa en öppen, reflekterande fråga (**mainQuestion**) som användaren kan ställa till sig själv för att fatta bättre beslut. Använd fetstil (**text**) för nyckelord i alla tre fält.`;

    if (currentSession.analysisHistory.length > 0) {
        prompt += ` Använd gärna den senaste analysen som kontext: ${JSON.stringify(currentSession.analysisHistory[currentSession.analysisHistory.length - 1])}.`;
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

        currentSession.analysisHistory.push(parsedResult);
        saveData();

        const formattedAnalysis = parsedResult.analysis.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        aiResponseText.innerHTML = `<p>${formattedAnalysis}</p>`;

        updateMainAdviceBox(parsedResult.mainAdvice, parsedResult.mainQuestion);

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

// Blinkande-funktion
function startZoneFlashing() {
    const zones = [
        document.getElementById('flash-zone-apati'),
        document.getElementById('flash-zone-vardag'),
        document.getElementById('flash-zone-flow')
    ];
    const flashClasses = ['flash-apati', 'flash-vardag', 'flash-flow'];
    let currentZoneIndex = 0;

    flashingInterval = setInterval(() => {
        zones.forEach(zone => {
            flashClasses.forEach(className => zone.classList.remove(className));
        });
        
        zones[currentZoneIndex].classList.add(flashClasses[currentZoneIndex]);
        
        currentZoneIndex = (currentZoneIndex + 1) % zones.length;
    }, 2000);
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

// NEW event listeners for goal management modal and navigation
activeGoalText.addEventListener('click', showGoalManagementModal);
closeGoalManagementButton.addEventListener('click', closeGoalManagementModal);
addGoalButton.addEventListener('click', () => {
    const newGoalName = newGoalInput.value.trim();
    if (newGoalName) {
        createNewSession(newGoalName);
        newGoalInput.value = '';
    } else {
        alert('Vänligen ge ditt nya mål ett namn.');
    }
});
prevGoalButton.addEventListener('click', (e) => { e.stopPropagation(); goToPrevSession(); });
nextGoalButton.addEventListener('click', (e) => { e.stopPropagation(); goToNextSession(); });

// Event listener for intro toggle
toggleIntroButton.addEventListener('click', () => {
    introContent.classList.toggle('hidden');
    headerContent.classList.toggle('hidden'); // New line to toggle the new header div
    toggleIcon.classList.toggle('rotate-180');
});

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

goalManagementModal.addEventListener('click', (e) => {
    if (e.target.id === 'goal-management-modal') {
        closeGoalManagementModal();
    }
});

// Stoppa eventbubbling för de inre boxarna
document.getElementById('suggestion-box').addEventListener('click', (e) => e.stopPropagation());
document.getElementById('note-box').addEventListener('click', (e) => e.stopPropagation());
document.querySelector('#goal-management-modal > div').addEventListener('click', (e) => e.stopPropagation());


dataSlider.addEventListener('input', updateCanvasWithSlider);

// Starta skissen, ladda data och starta blinkandet när DOM är laddad
window.onload = function() {
    p5SketchInstance = new p5(s);
    loadData();
    startZoneFlashing();
}
