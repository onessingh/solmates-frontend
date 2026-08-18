/**
 * SOLMATES - AI Game Connector
 * This script connects any frontend game to the backend AI system.
 * It automatically fetches new questions, stores them offline (localStorage) for fallback,
 * and uses static questions if everything else fails.
 */

class AIGameConnector {
    constructor() {
        this.backendUrl = 'https://solmates-backend-w27e.onrender.com/api/ai-tools/generate';
    }

    /**
     * @param {string} gameType - e.g., 'quiz-battle', 'business-hangman'
     * @param {string} subject - e.g., 'Corporate Finance'
     * @param {number} count - number of questions to generate
     * @param {Array} fallbackData - Static questions to use if AI and offline storage fail
     * @returns {Promise<Array>} The final array of questions
     */
    async getQuestions(gameType, subject, count = 5, fallbackData = []) {
        const storageKey = `solmates_game_${gameType}_${subject.replace(/\s+/g, '_')}`;
        
        let finalQuestions = [];
        let attempts = 0;
        
        try {
            while (finalQuestions.length < count && attempts < 2) {
                attempts++;
                const needed = count - finalQuestions.length;
                console.log(`[AI Connector] Requesting fresh questions for ${subject} (Attempt ${attempts})...`);
                
                const response = await fetch(this.backendUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        toolType: 'game-questions',
                        gameType: gameType,
                        subject: subject,
                        count: needed + 5,
                        difficulty: 'Medium'
                    })
                });

                if (!response.ok) throw new Error('AI Backend returned error');
                
                const data = await response.json();
                
                if (data.success && data.data && data.data.questions) {
                    let validQs = data.data.questions.filter(q => {
                        const opts = q.options || [];
                        if (opts.length < 2) return false;
                        const fakeCount = opts.filter(o => typeof o === 'string' && o.replace(/^[A-Da-d][).:\s]*/,'').trim().length <= 2).length;
                        if (fakeCount === opts.length) return false;
                        return true;
                    });
                    
                    finalQuestions = finalQuestions.concat(validQs);
                } else {
                    break;
                }
            }

            if (finalQuestions.length > 0) {
                finalQuestions = finalQuestions.slice(0, count);
                localStorage.setItem(storageKey, JSON.stringify({
                    timestamp: Date.now(),
                    questions: finalQuestions
                }));
                console.log(`[AI Connector] Returning ${finalQuestions.length} AI questions.`);
                return finalQuestions;
            } else {
                throw new Error('AI returned 0 valid questions');
            }
        } catch (error) {
            console.warn(`[AI Connector] AI Generation failed: ${error.message}. Falling back to offline database...`);
            
            const offlineData = localStorage.getItem(storageKey);
            if (offlineData) {
                const parsed = JSON.parse(offlineData);
                console.log(`[AI Connector] Loaded from Offline Storage`);
                return parsed.questions.slice(0, count);
            }
            
            console.log(`[AI Connector] No offline data found. Using static fallback database.`);
            return fallbackData.slice(0, count);
        }
    }
}

// Attach to window so all games can use it
window.aiGameConnector = new AIGameConnector();

