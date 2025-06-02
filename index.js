document.addEventListener('DOMContentLoaded', function() {

// Đối tượng chứa các bản dịch
const translations = {
    vi: {
        home: "Trang chủ",
        about: "Giới thiệu",
        skills: "Kỹ năng",
        projects: "Dự án",
        contact: "Liên hệ",
        hello: "Xin chào, tôi là",
        position: "Lập trình viên Full-stack",
        intro: "Tôi là lập trình viên với 5 năm kinh nghiệm...",
        download_cv: "Tải CV",
        view_projects: "Xem tất cả dự án",
        contact_me: "Liên hệ với tôi",
        send_message: "Gửi tin nhắn",
        // Thêm các bản dịch khác tại đây
    },
    en: {
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        hello: "Hello, I'm",
        position: "Full-stack Developer",
        intro: "I'm a developer with 5 years of experience...",
        download_cv: "Download CV",
        view_projects: "View all projects",
        contact_me: "Contact me",
        send_message: "Send message",
        // Thêm các bản dịch khác tại đây
    },
    ja: {
        home: "ホーム",
        about: "自己紹介",
        skills: "スキル",
        projects: "プロジェクト",
        contact: "連絡先",
        hello: "こんにちは、私は",
        position: "フルスタック開発者",
        intro: "私は5年の経験を持つ開発者です...",
        download_cv: "履歴書をダウンロード",
        view_projects: "すべてのプロジェクトを見る",
        contact_me: "お問い合わせ",
        send_message: "メッセージを送る",
        // Thêm các bản dịch khác tại đây
    }
};

// Hàm cập nhật ngôn ngữ
function updateLanguage(lang) {
    // Lưu ngôn ngữ đã chọn vào localStorage
    localStorage.setItem('language', lang);
    
    // Cập nhật text trên nút ngôn ngữ
    document.getElementById('current-language').textContent = lang.toUpperCase();
    
    // Cập nhật tất cả các phần tử có thuộc tính data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Cập nhật placeholder cho input
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Cập nhật các thuộc tính khác nếu cần
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('title', translations[lang][key]);
        }
    });
}

// Khởi tạo ngôn ngữ khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
    const savedLang = localStorage.getItem('language') || 'vi';
    updateLanguage(savedLang);
});

// Lấy các phần tử DOM cho dropdown ngôn ngữ
const languageToggle = document.getElementById('language-toggle');
const languageDropdown = document.getElementById('language-dropdown');
const languageArrow = document.getElementById('language-arrow');
const currentLanguage = document.getElementById('current-language');

// Toggle dropdown ngôn ngữ
languageToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    
    const isHidden = languageDropdown.classList.contains('hidden');
    
    if (isHidden) {
        languageDropdown.classList.remove('hidden');
        languageDropdown.classList.remove('scale-y-0');
        languageDropdown.classList.add('scale-y-100');
        languageArrow.classList.add('rotate-180');
    } else {
        hideLanguageDropdown();
    }
});

// Ẩn dropdown khi click ra ngoài
document.addEventListener('click', function() {
    hideLanguageDropdown();
});

// Xử lý khi chọn ngôn ngữ
document.querySelectorAll('#language-dropdown button').forEach(button => {
    button.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        updateLanguage(lang);
        hideLanguageDropdown();
    });
});

// Hàm ẩn dropdown
function hideLanguageDropdown() {
    languageDropdown.classList.add('hidden');
    languageDropdown.classList.remove('scale-y-100');
    languageDropdown.classList.add('scale-y-0');
    languageArrow.classList.remove('rotate-180');
}

  

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileDarkModeToggle = document.getElementById('mobile-dark-mode-toggle');
    // const darkModeIcon = document.getElementById('dark-mode-icon');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    const mobileSunIcon = document.getElementById('mobile-sun-icon');    
    const mobileMoonIcon = document.getElementById('mobile-moon-icon');
    // Check for saved dark mode preference
  // ...existing code...
    // Check for saved dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
// ...existing code...
    // Apply initial dark mode state
    if (darkMode) {
        document.documentElement.classList.add('dark');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    }

const darkMobileMode = localStorage.getItem('darkMode') === 'true' || 
        (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Apply initial dark mode mobile state
    if (darkMobileMode) {
        document.documentElement.classList.add('dark');
        mobileMoonIcon.classList.add('hidden');
        mobileSunIcon.classList.remove('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        mobileMoonIcon.classList.remove('hidden');
        mobileSunIcon.classList.add('hidden');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);
        
        // Toggle icons
        moonIcon.classList.toggle('hidden');
        sunIcon.classList.toggle('hidden');
    });
// Toggle mobile mode
    mobileDarkModeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);
        
        // Toggle icons
        mobileMoonIcon.classList.toggle('hidden');
        mobileSunIcon.classList.toggle('hidden');
    });



    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.classList.add('button-loading');
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.classList.remove('button-loading');
                submitButton.textContent = originalText;
                
                // Show success message
                alert('Tin nhắn của bạn đã được gửi thành công!');
                contactForm.reset();
            }, 1500);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        bar.setAttribute('data-width', width);
        observer.observe(bar);
    });

    
});




