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
        
        try {
            console.log(`[AI Connector] Requesting fresh questions for ${subject}...`);
            
            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toolType: 'game-questions',
                    gameType: gameType,
                    subject: subject,
                    count: count,
                    difficulty: 'Medium'
                })
            });

            if (!response.ok) throw new Error('AI Backend returned error');
            
            const data = await response.json();
            
            if (data.success && data.data && data.data.questions) {
                console.log(`[AI Connector] Successfully generated ${data.data.questions.length} questions!`);
                // Save offline for fallback
                localStorage.setItem(storageKey, JSON.stringify({
                    timestamp: Date.now(),
                    questions: data.data.questions
                }));
                return data.data.questions;
            } else {
                throw new Error('Invalid AI data structure');
            }
        } catch (error) {
            console.warn(`[AI Connector] AI Generation failed: ${error.message}. Falling back to offline database...`);
            
            // 1. Try LocalStorage Offline Data First
            const offlineData = localStorage.getItem(storageKey);
            if (offlineData) {
                const parsed = JSON.parse(offlineData);
                console.log(`[AI Connector] Loaded from Offline Storage (Stored on: ${new Date(parsed.timestamp).toLocaleString()})`);
                return parsed.questions;
            }
            
            // 2. Try Static Fallback (data.js/json)
            console.log(`[AI Connector] No offline data found. Using static fallback database.`);
            return fallbackData;
        }
    }
}

// Attach to window so all games can use it
window.aiGameConnector = new AIGameConnector();
