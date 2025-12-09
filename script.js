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



//sharing 
const siteURL = window.location.href; 

document.querySelector(".whatsapp").addEventListener("click", () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(siteURL)}`, "_blank");
});

document.querySelector(".facebook").addEventListener("click", () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteURL)}`, "_blank");
});

document.querySelector(".instagram").addEventListener("click", () => {
    navigator.clipboard.writeText(siteURL);
    alert("Link copied! Share it on Instagram.");
});
