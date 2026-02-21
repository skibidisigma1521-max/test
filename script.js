// ===== CONFIGURATION =====
const CONFIG = {
    PASSWORD: 'love', // Change this to your desired password
    RELATIONSHIP_START: new Date('2025-12-16'),
    LETTER_TEXT: `Dear my love,

Every moment with you feels like a dream I never want to wake up from. Since that beautiful day on December 16th, my life has been painted in colors I never knew existed.

You are my favorite person, my greatest adventure, and my home all at once. The way you smile, the way you understand me without words, the way your hand fits perfectly in mine—all of these remind me daily that you are my forever person.

Through laughter and tears, through easy days and difficult ones, you've been my rock, my safe harbor, my reason to smile.

I love you more than words could ever express. Thank you for choosing me, for loving me, and for being my greatest blessing.

Forever and always yours,
With all my love ❤️`
};

// ===== INITIALIZATION ===== 
document.addEventListener('DOMContentLoaded', () => {
    initializeBackgroundElements();
    setupPasswordPage();
    setupLetterPage();
    setupNavigation();
    setupMusicToggle();
    startTimer();
    
    // Start playing background music after user interaction
    document.addEventListener('click', playMusicOnce, { once: true });
});

let musicStarted = false;

function playMusicOnce() {
    if (!musicStarted) {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.volume = 0.3;
        bgMusic.play().catch(() => {
            console.log('Autoplay blocked - user will need to click music toggle');
        });
        musicStarted = true;
    }
}

// ===== BACKGROUND ELEMENTS ===== 
function initializeBackgroundElements() {
    // Create floating hearts
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        floatingHeartsContainer.appendChild(heart);
    }

    // Create floating music notes
    const floatingNotesContainer = document.querySelector('.floating-music-notes');
    for (let i = 0; i < 6; i++) {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.textContent = i % 2 === 0 ? '♪' : '♫';
        note.style.left = Math.random() * 100 + '%';
        note.style.top = Math.random() * 100 + '%';
        note.style.animationDuration = (Math.random() * 5 + 8) + 's';
        note.style.animationDelay = Math.random() * 3 + 's';
        floatingNotesContainer.appendChild(note);
    }
}

// ===== PASSWORD PAGE ===== 
function setupPasswordPage() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordBtn = document.getElementById('passwordBtn');
    const errorMsg = document.getElementById('passwordError');

    passwordBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    function checkPassword() {
        const input = passwordInput.value;
        
        if (input === CONFIG.PASSWORD) {
            playErrorSound();
            transitionPages(1, 2);
            passwordInput.value = '';
            document.querySelector('.nav-btn[data-page="1"]').disabled = true;
        } else {
            errorMsg.textContent = '❌ Wrong password. Try again!';
            passwordInput.value = '';
            passwordInput.shake = true;
            setTimeout(() => {
                errorMsg.textContent = '';
            }, 2000);
        }
    }
}

// ===== PLAY SUCCESS SOUND (Racing engine) =====
function playErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Ferrari engine sound effect
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    // Engine rev sound
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0, now + 0.2);
    
    osc.start(now);
    osc.stop(now + 0.2);
}

// ===== TIMER ===== 
function startTimer() {
    updateTimer();
    setInterval(updateTimer, 1000);
}

function updateTimer() {
    const now = new Date();
    const start = CONFIG.RELATIONSHIP_START;
    
    // Calculate differences
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    
    if (days < 0) {
        months--;
        const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastDay.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    document.getElementById('timerYears').textContent = years;
    document.getElementById('timerMonths').textContent = months;
    document.getElementById('timerDays').textContent = days;
    document.getElementById('timerHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('timerMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('timerSeconds').textContent = String(seconds).padStart(2, '0');
}

// ===== LETTER PAGE ===== 
function setupLetterPage() {
    const envelope = document.getElementById('envelope');
    const letterOpened = document.getElementById('letterOpened');
    const closeBtn = document.getElementById('closeLetterBtn');

    envelope.addEventListener('click', openLetter);
    closeBtn.addEventListener('click', closeLetter);

    function openLetter() {
        envelope.classList.add('opened');
        setTimeout(() => {
            envelope.classList.add('hidden');
            letterOpened.classList.remove('hidden');
            closeBtn.classList.remove('hidden');
            typeLetterAnimation();
        }, 600);
    }

    function closeLetter() {
        letterOpened.classList.add('hidden');
        closeBtn.classList.add('hidden');
        envelope.classList.remove('opened', 'hidden');
        document.getElementById('letterContent').textContent = '';
    }
}

function typeLetterAnimation() {
    const letterContent = document.getElementById('letterContent');
    const text = CONFIG.LETTER_TEXT;
    let index = 0;
    const typingSpeed = 20;

    function type() {
        if (index < text.length) {
            const char = text.charAt(index);
            if (char === '\n') {
                letterContent.innerHTML += '<br>';
            } else {
                letterContent.textContent += char;
            }
            index++;
            setTimeout(type, typingSpeed);
        }
    }

    type();
}

// ===== PAGE TRANSITIONS ===== 
function transitionPages(fromPage, toPage) {
    const currentPage = document.querySelector(`.page[id="page-${['password', 'timer', 'movie', 'spotify', 'letter', 'flowers'][fromPage - 1]}"]`);
    const nextPage = document.querySelector(`.page[id="page-${['password', 'timer', 'movie', 'spotify', 'letter', 'flowers'][toPage - 1]}"]`);
    
    if (currentPage) currentPage.classList.remove('active');
    if (nextPage) nextPage.classList.add('active');
    
    updateNavigationButtons(toPage);
}

function updateNavigationButtons(pageNum) {
    document.querySelectorAll('.nav-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === pageNum);
    });
}

// ===== NAVIGATION ===== 
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageMap = ['page-password', 'page-timer', 'page-movie', 'page-spotify', 'page-letter', 'page-flowers'];

    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (!btn.disabled) {
                const pageId = pageMap[index];
                const pages = document.querySelectorAll('.page');
                pages.forEach(page => page.classList.remove('active'));
                document.getElementById(pageId).classList.add('active');
                updateNavigationButtons(index + 1);
            }
        });
    });
}

// ===== MUSIC TOGGLE ===== 
function setupMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => console.log('Playback failed'));
            musicToggle.querySelector('.music-icon').textContent = '🔊';
        } else {
            bgMusic.pause();
            musicToggle.querySelector('.music-icon').textContent = '🔇';
        }
    });
}

// ===== ROSE PETALS (Page 6) ===== 
function startRosePetals() {
    const petalsContainer = document.querySelector('.rose-petals');
    
    // Only start on page 6
    const observer = new MutationObserver(() => {
        const page6 = document.getElementById('page-flowers');
        if (page6 && page6.classList.contains('active')) {
            createPetal();
            setTimeout(() => startRosePetals(), 500);
        }
    });

    observer.observe(document.querySelector('.page'), { attributes: true });

    function createPetal() {
        const page6 = document.getElementById('page-flowers');
        if (!page6 || !page6.classList.contains('active')) return;

        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = '🌹';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.top = '-50px';
        petal.style.animationDuration = (Math.random() * 3 + 5) + 's';
        petal.style.animationDelay = '0s';
        
        petalsContainer.appendChild(petal);

        setTimeout(() => petal.remove(), 8000);
    }
}

// Start petals on page 6 activation
document.addEventListener('DOMContentLoaded', () => {
    const flowersPage = document.getElementById('page-flowers');
    const observer = new MutationObserver(() => {
        if (flowersPage.classList.contains('active')) {
            startRosePetals();
        }
    });
    observer.observe(flowersPage, { attributes: true });
});
