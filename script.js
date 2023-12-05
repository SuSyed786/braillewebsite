const textInput = document.getElementById('textInput');
const morseOutput = document.getElementById('morseOutput');
const convertButton = document.getElementById('convertButton');
const playSoundButton = document.getElementById('playSound');

const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/'
};

convertButton.addEventListener('click', function() {
    const text = textInput.value.toUpperCase();
    let morseCode = '';
    for (const character of text) {
        morseCode += morseCodeMap[character] + ' ';
    }
    morseOutput.textContent = morseCode;
});

playSoundButton.addEventListener('click', function() {
    playMorseCode(morseOutput.textContent);
});

function playMorseCode(morseCode) {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const dot = 1.2 / 15; // Morse code standard timing for the length of a dot

    let time = context.currentTime;

    morseCode.split('').forEach(symbol => {
        const oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, time);
        oscillator.connect(context.destination);

        if (symbol === '.') {
            oscillator.start(time);
            time += dot;
            oscillator.stop(time);
        } else if (symbol === '-') {
            oscillator.start(time);
            time += dot * 3;
            oscillator.stop(time);
        }

        // Gap between dots/dashes
        time += dot;

        // Additional gap for space between letters
        if (symbol === ' ') {
            time += dot * 3;
        }
    });
}
