// DOM elementlari
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const navLinks = document.getElementById('navLinks');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const userAvatar = document.getElementById('userAvatar');
const logoutBtn = document.getElementById('logoutBtn');
const joinButtons = document.querySelectorAll('.join-btn');
const modal = document.getElementById('joinModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const closeModal = document.querySelector('.close-modal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const aiToggle = document.querySelector('.ai-toggle');
const aiChat = document.querySelector('.ai-chat-container');
const aiClose = document.querySelector('.ai-close');
const aiMessages = document.getElementById('aiMessages');
const aiInput = document.getElementById('aiInput');
const aiSendBtn = document.getElementById('aiSendBtn');

// Dark Mode
function toggleDarkMode() {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.removeItem('darkMode');
    } else {
        body.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('darkMode', 'enabled');
    }
}

// Dark mode holatini tekshirish
if (localStorage.getItem('darkMode')) {
    body.setAttribute('data-theme', 'dark');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', toggleDarkMode);

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Foydalanuvchi avatarini tekshirish
function updateUserAvatar() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        userAvatar.querySelector('.avatar-initial').textContent = loggedInUser.charAt(0).toUpperCase();
        userAvatar.style.backgroundColor = getRandomColor();
    } else {
        userAvatar.querySelector('.avatar-initial').textContent = '<i class="fas fa-user"></i>';
        userAvatar.style.backgroundColor = '#666';
    }
}

function getRandomColor() {
    const colors = ['#2196F3', '#FF5722', '#4CAF50', '#9C27B0', '#E91E63', '#00BCD4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Chiqish
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    updateUserAvatar();
    window.location.href = 'index.html';
});

// Scroll animatsiyalari
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementPosition < windowHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Modal oyna
function openModal(tournament) {
    modalTitle.textContent = `${tournament} Turniriga Qatnashish`;
    modalText.textContent = `${tournament} turniriga qatnashish uchun admin bilan bog'laning:`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

joinButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tournament = button.getAttribute('data-tournament');
        openModal(tournament);
    });
});

closeModal.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// AI Yordamchi
function toggleAIChat() {
    aiChat.classList.toggle('active');
}

function sendMessage() {
    const message = aiInput.value.trim();
    if (message) {
        // Foydalanuvchi xabarini qo'shish
        addMessage(message, 'user');
        aiInput.value = '';
        
        // AI javobi
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, 'ai');
        }, 500);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('ai-message');
    
    if (sender === 'user') {
        messageDiv.classList.add('ai-user');
        messageDiv.style.marginLeft = 'auto';
        messageDiv.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
        messageDiv.style.borderBottomRightRadius = '5px';
    } else {
        messageDiv.classList.add('ai-response');
    }
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.textContent = text;
    
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    const now = new Date();
    timeDiv.textContent = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);
    aiMessages.appendChild(messageDiv);
    
    // Scrollni pastga olib borish
    aiMessages.scrollTop = aiMessages.scrollHeight;
}

function getAIResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('salom') || lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
        return "Salom! PUBG Turnir yordamchisiga xush kelibsiz! Sizga qanday yordam bera olaman?";
    } else if (lowerMsg.includes('qatnash') || lowerMsg.includes('ishtirok')) {
        return "Turnirlarga qatnashish uchun kerakli turnir kartasidagi 'Qatnashish' tugmasini bosing yoki to'g'ridan-to'g'ri admin bilan bog'laning: @legendjonnn";
    } else if (lowerMsg.includes('turnir') || lowerMsg.includes('tournament')) {
        return "Bizda Erangel, TDM va Livik turnirlari mavjud. Bosh sahifadagi kartalardan birini tanlang yoki 'Barchasini ko'rish' tugmasini bosing.";
    } else if (lowerMsg.includes('admin') || lowerMsg.includes('support')) {
        return "Admin bilan bog'lanish uchun: @legendjonnn yoki pastki chap tomondagi 'Yordam' tugmasini bosing. Ular sizga tez orada javob berishadi!";
    } else if (lowerMsg.includes('help') || lowerMsg.includes('yordam')) {
        return "Quyidagi mavzularda yordam bera olaman:\n- Turnirlar haqida ma'lumot\n- Qatnashish tartibi\n- Admin bilan bog'lanish\n- Ro'yxatdan o'tish\n- Profil sozlamalari\n\nQaysi biriga yordam kerak?";
    } else if (lowerMsg.includes('narx') || lowerMsg.includes('price') || lowerMsg.includes('sovg\'a')) {
        return "Turnirlar sovg'a jamg'armasi har xil:\n- Erangel Classic: 1,000,000 UZS\n- Team Deathmatch: 500,000 UZS\n- Livik Challenge: 750,000 UZS\n\nBatafsil ma'lumot uchun turnir sahifasiga o'ting.";
    } else if (lowerMsg.includes('vaqt') || lowerMsg.includes('time') || lowerMsg.includes('sana')) {
        return "Yaqinlashayotgan turnirlar:\n- Erangel Classic: 15 Avgust, 18:00\n- Team Deathmatch: 20 Avgust, 17:00\n- Livik Challenge: 25 Avgust, 19:00\n\nBarcha vaqtlar Toshkent vaqti bilan ko'rsatilgan.";
    } else {
        return "Kechirasiz, sizning so'rovingizni tushunmadim. Iltimos, quyidagilardan birini so'rang:\n- Turnirlar haqida\n- Qatnashish tartibi\n- Admin bilan bog'lanish\n\nYoki 'Yordam' deb yozing.";
    }
}

aiToggle.addEventListener('click', toggleAIChat);
aiClose.addEventListener('click', toggleAIChat);
aiSendBtn.addEventListener('click', sendMessage);
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Ripple effekti
function createRipple(e) {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    circle.classList.add('ripple');
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    
    btn.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Navbar scroll effekti
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Sahifa yuklanganda animatsiyalarni ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    updateUserAvatar();
    animateOnScroll();
    
    // Agar login sahifada bo'lsa
    if (document.querySelector('.login-container')) {
        setupLoginPage();
    }
});

// Login sahifasi uchun funktsiyalar
function setupLoginPage() {
    const flipContainer = document.querySelector('.flip-container');
    const toggleBtn = document.querySelector('.toggle-btn');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            flipContainer.classList.toggle('flipped');
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = registerForm.querySelector('input[type="text"]').value;
            const email = registerForm.querySelector('input[type="email"]').value;
            const password = registerForm.querySelector('input[type="password"]').value;
            
            if (username && email && password) {
                localStorage.setItem('loggedInUser', username);
                window.location.href = 'index.html';
            } else {
                alert('Iltimos, barcha maydonlarni to\'ldiring!');
            }
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            
            if (email && password) {
                const username = email.split('@')[0];
                localStorage.setItem('loggedInUser', username);
                window.location.href = 'index.html';
            } else {
                alert('Iltimos, email va parolni kiriting!');
            }
        });
    }
}
// Auth sahifasi uchun JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const flipContainer = document.querySelector('.flip-container');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Formlarni aylantirish
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        flipContainer.classList.add('flipped');
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        flipContainer.classList.remove('flipped');
    });
    
    // Kirish formasi
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            alert('Iltimos, email va parolni kiriting!');
            return;
        }
        
        // Bu yerda haqiqiy autentifikatsiya logikasi bo'lishi kerak
        // Hozircha oddiy demo versiya
        const username = email.split('@')[0];
        localStorage.setItem('loggedInUser', username);
        
        // Bosh sahifaga yo'naltirish
        window.location.href = 'index.html';
    });
    
    // Ro'yxatdan o'tish formasi
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;
        
        if (!username || !email || !password || !confirm) {
            alert('Iltimos, barcha maydonlarni to\'ldiring!');
            return;
        }
        
        if (password !== confirm) {
            alert('Parollar mos kelmadi!');
            return;
        }
        
        // Bu yerda haqiqiy ro'yxatdan o'tish logikasi bo'lishi kerak
        // Hozircha oddiy demo versiya
        localStorage.setItem('loggedInUser', username);
        
        // Bosh sahifaga yo'naltirish
        window.location.href = 'index.html';
    });
    
    // Google va Facebook orqali kirish (demo)
    document.querySelector('.btn-social.google').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Google orqali kirish hozircha ishlamaydi. Iltimos, oddiy formadan foydalaning.');
    });
    
    document.querySelector('.btn-social.facebook').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Facebook orqali kirish hozircha ishlamaydi. Iltimos, oddiy formadan foydalaning.');
    });
});
// Turnir sahifasi uchun JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Filtirlash funksiyasi
    const teamFilter = document.getElementById('teamFilter');
    const statusFilter = document.getElementById('statusFilter');
    const teamCards = document.querySelectorAll('.team-card');
    
    function filterTeams() {
        const teamValue = teamFilter.value;
        const statusValue = statusFilter.value;
        
        teamCards.forEach(card => {
            const teamName = card.querySelector('h3').textContent.toLowerCase();
            const teamStatus = card.querySelector('.team-status').classList.contains(statusValue) ? statusValue : 'all';
            
            const teamMatch = teamValue === 'all' || teamName.includes(teamValue);
            const statusMatch = statusValue === 'all' || teamStatus === statusValue;
            
            if (teamMatch && statusMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    teamFilter.addEventListener('change', filterTeams);
    statusFilter.addEventListener('change', filterTeams);
    
    // Qatnashish tugmasi
    const joinBtn = document.querySelector('.join-btn');
    if (joinBtn) {
        joinBtn.addEventListener('click', function() {
            const tournament = this.getAttribute('data-tournament');
            openModal(tournament);
        });
    }
    
    // Demo ma'lumotlarni yuklash
    function loadDemoData() {
        // Bu yerda haqiqiy ma'lumotlar API dan olinadi
        // Hozircha demo ma'lumotlar
        const demoTeams = [
            {
                name: "Wolves",
                status: "pending",
                members: [
                    { name: "Diyor", role: "Jamoa sardori", color: "#FF5722" },
                    { name: "Bekzod", role: "O'qchi", color: "#2196F3" },
                    { name: "Jamshid", role: "Dasturchi", color: "#4CAF50" },
                    { name: "Farrux", role: "Strateg", color: "#9C27B0" }
                ]
            },
            {
                name: "Dragons",
                status: "confirmed",
                members: [
                    { name: "Akmal", role: "Jamoa sardori", color: "#E91E63" },
                    { name: "Shuhrat", role: "O'qchi", color: "#00BCD4" },
                    { name: "Rustam", role: "Dasturchi", color: "#8BC34A" },
                    { name: "Jahongir", role: "Strateg", color: "#673AB7" }
                ]
            }
        ];
        
        const teamsGrid = document.querySelector('.teams-grid');
        
        demoTeams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';
            
            let membersHTML = '';
            team.members.forEach(member => {
                membersHTML += `
                    <div class="member">
                        <div class="member-avatar" style="background-color: ${member.color}">${member.name.charAt(0)}</div>
                        <div class="member-info">
                            <h4>${member.name}</h4>
                            <span class="member-role">${member.role}</span>
                        </div>
                    </div>
                `;
            });
            
            teamCard.innerHTML = `
                <div class="team-header">
                    <h3>${team.name}</h3>
                    <span class="team-status ${team.status}">${team.status === 'confirmed' ? 'Tasdiqlangan' : 'Kutilmoqda'}</span>
                </div>
                <div class="team-members">
                    ${membersHTML}
                </div>
            `;
            
            teamsGrid.appendChild(teamCard);
        });
    }
    
    loadDemoData();
});
// script.js ga qo'shing
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#FF5722" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#FF5722", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        }
      }
    });
  }
});
