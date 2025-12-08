const langBox = document.querySelector('.change-language');
const en = langBox.querySelector('.english');
const hi = langBox.querySelector('.hindi');

langBox.addEventListener('click', () => {
    
    // If English is visible → switch to Hindi
    if (!en.classList.contains('hidden')) {
        en.classList.add('hidden');
        hi.classList.remove('hidden');
    }

    // Else English was hidden → show English again
    else {
        en.classList.remove('hidden');
        hi.classList.add('hidden');
    }
});

