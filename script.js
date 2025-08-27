document.addEventListener('DOMContentLoaded', function () {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const btnGroup = document.querySelector('.btn-group');
    const display = document.getElementById('set-font');
    let currentLetter = '';
    let colorCycleInterval = null;

    // Generate letter buttons with random colors
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.id = `btn-${letter}`;
        button.className = 'letter-btn';
        button.innerText = letter;

        // Assign a random color from a child-friendly palette
        const colors = [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE',
            '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE',
            '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        button.style.background = `linear-gradient(135deg, ${color}, ${adjustColor(color, -40)})`;

        button.addEventListener('click', () => handleLetterClick(letter));
        btnGroup.appendChild(button);
    });

    // Adjust color brightness
    function adjustColor(hex, amount) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);

        r = Math.max(0, Math.min(255, r + amount));
        g = Math.max(0, Math.min(255, g + amount));
        b = Math.max(0, Math.min(255, b + amount));

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Handle letter button click
    function handleLetterClick(letter) {
        currentLetter = letter;
        display.innerText = letter;

        // Add bounce animation
        display.classList.remove('bounce');
        void display.offsetWidth; // Trigger reflow
        display.classList.add('bounce');

        // Speak the letter
        speakLetter(letter);
    }

    // Speak the letter using speech synthesis
    function speakLetter(letter) {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(letter);
            speech.volume = 1;
            speech.rate = 0.8;
            speech.pitch = 1.2;
            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            window.speechSynthesis.speak(speech);
        }
    }

    // Control button event listeners
    document.getElementById('speak-letter').addEventListener('click', () => {
        if (currentLetter) {
            speakLetter(currentLetter);
        }
    });

    // document.getElementById('repeat-sound').addEventListener('click', () => {
    //     if (currentLetter) {
    //         // Say the letter sound three times with a child-friendly approach
    //         if ('speechSynthesis' in window) {
    //             const speech = new SpeechSynthesisUtterance(`${currentLetter} says ${getLetterSound(currentLetter)}`);
    //             speech.volume = 1;
    //             speech.rate = 0.8;
    //             speech.pitch = 1.2;
    //             window.speechSynthesis.speak(speech);
    //         }
    //     }
    // });

    // Get the phonetic sound of the letter
    function getLetterSound(letter) {
        const sounds = {
            'A': 'ay', 'B': 'buh', 'C': 'kuh', 'D': 'duh', 'E': 'eh',
            'F': 'fuh', 'G': 'guh', 'H': 'huh', 'I': 'ih', 'J': 'juh',
            'K': 'kuh', 'L': 'luh', 'M': 'muh', 'N': 'nuh', 'O': 'oh',
            'P': 'puh', 'Q': 'kwuh', 'R': 'ruh', 'S': 'sss', 'T': 'tuh',
            'U': 'uh', 'V': 'vuh', 'W': 'wuh', 'X': 'eks', 'Y': 'yuh', 'Z': 'zuh'
        };
        return sounds[letter] || letter;
    }

    document.getElementById('color-cycle').addEventListener('click', () => {
        if (colorCycleInterval) {
            clearInterval(colorCycleInterval);
            colorCycleInterval = null;
            display.classList.remove('color-cycle');
        } else {
            display.classList.add('color-cycle');
        }
    });

    document.getElementById('fun-animation').addEventListener('click', () => {
        if (currentLetter) {
            display.classList.remove('spin');
            void display.offsetWidth; // Trigger reflow
            display.classList.add('spin');
        }
    });

    // Initialize with the first letter
    handleLetterClick('A');
});
