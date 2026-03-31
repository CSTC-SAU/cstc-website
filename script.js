// Mobile Menu Overlay Logic
const menuBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        // Small delay to allow display:block to apply before animating opacity
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0');
            mobileMenu.classList.add('opacity-100');
            menuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        closeMenu();
    }
});

function closeMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove('opacity-100');
    mobileMenu.classList.add('opacity-0');
    menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Wait for fade out animation to finish before hiding
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
    }, 300);
}

// Close menu when clicking a link inside it
mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Intersection Observer for Scroll Fade-Up Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Select all elements with the 'fade-up' class and observe them
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));
});

// Hero Section Typewriter Effect
const heroPhrases = [
    "write the code.", 
    "build the apps.", 
    "design the UI.", 
    "innovate together."
];

let phraseIndex = 0;
let letterIndex = 0;
const typingSpeed = 100;
const erasingSpeed = 50;
const delayBetweenPhrases = 2000;
const heroTypewriterElement = document.getElementById("hero-typewriter");

function typeHeroText() {
    if (letterIndex < heroPhrases[phraseIndex].length) {
        heroTypewriterElement.textContent += heroPhrases[phraseIndex].charAt(letterIndex);
        letterIndex++;
        setTimeout(typeHeroText, typingSpeed);
    } else {
        setTimeout(eraseHeroText, delayBetweenPhrases);
    }
}

function eraseHeroText() {
    if (letterIndex > 0) {
        heroTypewriterElement.textContent = heroPhrases[phraseIndex].substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(eraseHeroText, erasingSpeed);
    } else {
        phraseIndex++;
        if (phraseIndex >= heroPhrases.length) phraseIndex = 0;
        setTimeout(typeHeroText, typingSpeed + 500);
    }
}

// Start the hero typing effect slightly after the page loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeHeroText, 1000); 
});

// Binary Easter Egg Logic
const estBox = document.getElementById('est-box');
const binaryT = document.getElementById('binary-t');
const decodedDate = document.getElementById('decoded-date');
const typedDateElement = document.getElementById('typed-date');

const targetDate = "11 FEB 2025";
let isDecrypted = false;
let typeInterval;

function decryptSequence() {
    if (isDecrypted) return;
    isDecrypted = true;

    // 1. Fade out the binary 'T'
    binaryT.classList.add('opacity-0', 'scale-110');
    binaryT.classList.remove('opacity-100', 'scale-100');

    // 2. Bring in the date container
    decodedDate.classList.remove('opacity-0', 'scale-95');
    decodedDate.classList.add('opacity-100', 'scale-100');

    // 3. Typewriter effect for the date
    typedDateElement.textContent = "";
    let i = 0;
    
    clearInterval(typeInterval);
    typeInterval = setInterval(() => {
        if (i < targetDate.length) {
            typedDateElement.textContent += targetDate.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 80); // Speed of typing (80ms per letter)
}

function encryptSequence() {
    if (!isDecrypted) return;
    isDecrypted = false;

    // Fade out date, bring back binary
    decodedDate.classList.remove('opacity-100', 'scale-100');
    decodedDate.classList.add('opacity-0', 'scale-95');
    
    binaryT.classList.remove('opacity-0', 'scale-110');
    binaryT.classList.add('opacity-100', 'scale-100');
    
    // Clear typing effect for next time
    setTimeout(() => { typedDateElement.textContent = ""; }, 500);
}

// Trigger on hover
estBox.addEventListener('mouseenter', decryptSequence);
estBox.addEventListener('mouseleave', encryptSequence);

// Also trigger automatically every 8 seconds so mobile users see it
setInterval(() => {
    decryptSequence();
    setTimeout(encryptSequence, 3000); // stay decrypted for 3 seconds, then revert
}, 8000);