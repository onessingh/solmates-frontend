/**
 * Solmates Central Profanity Filter v1.0
 * Single source of truth for all pages.
 * Include this file wherever nickname/user input is taken.
 */
window.solmatesBadWords = [
    // English
    'fuck', 'shit', 'bitch', 'asshole', 'porn', 'dick', 'pussy', 'slut',
    'whore', 'cunt', 'bastard', 'fucker', 'motherfucker', 'suck', 'xxx',
    'xnxx', 'nude', 'naked', 'boobs', 'tits', 'booty',

    // Hindi - gaali
    'chut', 'choot', 'chuut', 'chutiya', 'chutiye', 'chutya',
    'madarchod', 'bhenchod', 'behenchod', 'bhenchodd',
    'bsdk', 'bhosdike', 'bhosdi',
    'randi', 'raand',
    'gandu', 'gand', 'gaand',
    'jhant', 'jhantu', 'jhaant',
    'lund', 'lauda', 'lawda', 'lodu', 'loda', 'land',
    'chod', 'chodu',
    'muth', 'mutth', 'mutthal', 'muthal', 'muthiya',
    'tatte', 'tatta', 'tatay',
    'kutta', 'kutiya', 'kuttiya', 'kutti',
    'kamina', 'harami',
    'bhadwa', 'bhadwe', 'bhadwi',
    'hijra', 'chhakka',
    'bc', 'mc',

    // Extended Hindi/English slang
    'boor', 'bur', 'bhur', 'bhurr', 'bhonsd', 'bhosad', 'bhosada', 'chud', 'chuda', 'chodo', 'chodna', 'chudai', 'chudakkad', 'chuche', 'chuchi', 'chuchiyan', 'mammay', 'mamma', 'tharki', 'tharak', 'mooth', 'muthi', 'budiya', 'tatti', 'tatte', 'hagna', 'mutna', 'jhat', 'jhaat', 'jhatu', 'jhaantu', 'pel', 'pelu', 'pela', 'rakhel', 'dalal', 'bhadava', 'nigga', 'nigger', 'fag', 'faggot', 'retard', 'dyke', 'tranny',
];

window.solmatesCheckProfanity = function(text) {
    if (!text) return false;

    // Normalize leetspeak: sh1t -> shit, ch0du -> chodu
    let normalized = text.toLowerCase()
        .replace(/0/g, 'o')
        .replace(/1/g, 'i')
        .replace(/3/g, 'e')
        .replace(/4/g, 'a')
        .replace(/5/g, 's')
        .replace(/@/g, 'a')
        .replace(/\$/g, 's')
        .replace(/!/g, 'i')
        .replace(/[^a-z]/g, ''); // strip all non-alpha

    for (let word of window.solmatesBadWords) {
        if (!normalized.includes(word)) continue;

        // Whitelist false positives
        if (word === 'chut' && (normalized.includes('chutney') || normalized.includes('parachute'))) continue;
        if (word === 'land' && normalized.length > 6) continue; // "ireland", "portland" etc

        // For very short words (bc, mc), require word boundary in original text
        if (word.length <= 3) {
            const clean = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
            if (!new RegExp(`\\b${word}\\b`).test(clean)) continue;
        }

        return true; // Profanity found!
    }
    return false;
};

window.solmatesHasInvalidChars = function(text) {
    return /[\*\#\$\!\^\%\~\@\?\&]/.test(text) || (text.match(/x/gi) || []).length >= 2;
};
