document.addEventListener('DOMContentLoaded', function() {
    // DOM elementlari
    const darkModeToggle = document.getElementById('darkModeToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const adminSidebar = document.getElementById('adminSidebar');
    const userAvatar = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');
    const menuLinks = document.querySelectorAll('.admin-menu a');
    const adminContent = document.getElementById('adminContent');
    const modalOverlay = document.getElementById('modalOverlay');
    const mainModal = document.getElementById('mainModal');
    const modalClose = document.getElementById('modalClose');
    
    // Dark Mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Mobil menyu
    mobileMenuBtn.addEventListener('click', function() {
        adminSidebar.classList.toggle('mobile-show');
    });
    
    // Sahifa yuklash
    function loadPage(page) {
        // Avvalgi aktiv menyuni olib tashlash
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Loading holatini ko'rsatish
        adminContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></div>';
        
        // Sahifani yuklash
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                adminContent.innerHTML = html;
                // Yangi menyuni aktiv qilish
                document.querySelector(`.menu-item a[data-page="${page}"]`).parentElement.classList.add('active');
                // Sahifa sarlavhasini yangilash
                document.title = `${getPageTitle(page)} - PUBG Turnir Admin`;
                // Breadcrumb yangilash
                updateBreadcrumb(page);
                // Sahifaga xos skriptlarni ishga tushirish
                initPageScripts(page);
            })
            .catch(error => {
                console.error('Sahifa yuklanmadi:', error);
                showError('Sahifa yuklanmadi. Iltimos, internet aloqasini tekshiring.');
            });
    }
    
    // Sahifa sarlavhalari
    function getPageTitle(page) {
        const titles = {
            dashboard: 'Boshqaruv Paneli',
            players: 'O\'yinchilar',
            tournaments: 'Turnirlar',
            teams: 'Jamoalar',
            payments: 'To\'lovlar',
            reports: 'Hisobotlar',
            settings: 'Sozlamalar'
        };
        return titles[page] || 'Admin Panel';
    }
    
    // Breadcrumb yangilash
    function updateBreadcrumb(page) {
        const breadcrumb = document.getElementById('breadcrumb');
        if (breadcrumb) {
            breadcrumb.innerHTML = `
                <a href="#" data-page="dashboard"><i class="fas fa-home"></i></a>
                <span> / </span>
                <span>${getPageTitle(page)}</span>
            `;
        }
    }
    
    // Sahifaga xos skriptlar
    function initPageScripts(page) {
        console.log(`${page} sahifasi skriptlari ishga tushirilmoqda...`);
        // Bu yerda har bir sahifa uchun maxsus skriptlar ishga tushadi
    }
    
    // Xatolikni ko'rsatish
    function showError(message) {
        adminContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Xatolik yuz berdi</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="location.reload()">
                    <i class="fas fa-sync-alt"></i> Qayta yuklash
                </button>
            </div>
        `;
    }
    
    // Modal oynalar
    function showModal(title, content, confirmCallback = null) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        
        const confirmBtn = document.getElementById('modalConfirm');
        if (confirmCallback) {
            confirmBtn.style.display = 'inline-block';
            confirmBtn.onclick = function() {
                confirmCallback();
                hideModal();
            };
        } else {
            confirmBtn.style.display = 'none';
        }
        
        modalOverlay.style.display = 'block';
        mainModal.style.display = 'block';
        setTimeout(() => {
            modalOverlay.style.opacity = '1';
            mainModal.style.opacity = '1';
            mainModal.style.transform = 'translateY(0)';
        }, 10);
    }
    
    function hideModal() {
        modalOverlay.style.opacity = '0';
        mainModal.style.opacity = '0';
        mainModal.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            mainModal.style.display = 'none';
        }, 300);
    }
    
    // Chiqish
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showModal(
            'Tizimdan chiqish', 
            'Haqiqatan ham hisobdan chiqmoqchimisiz?', 
            function() {
                localStorage.removeItem('authToken');
                window.location.href = 'login.html';
            }
        );
    });
    
    // Modal yopish
    modalClose.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', hideModal);
    
    // Sahifalarga o'tish
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadPage(page);
            // Mobil menyuni yopish
            adminSidebar.classList.remove('mobile-show');
        });
    });
    
    // Hash orqali navigatsiya
    window.addEventListener('hashchange', function() {
        const page = window.location.hash.substring(1) || 'dashboard';
        loadPage(page);
    });
    
    // Dastlabki sahifani yuklash
    const initialPage = window.location.hash.substring(1) || 'dashboard';
    loadPage(initialPage);
});