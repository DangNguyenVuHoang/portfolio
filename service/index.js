document.addEventListener('DOMContentLoaded', function () {

//    function downloadSampleCV() {
//     // Đường dẫn đến file CV mẫu đã có sẵn
//     const cvUrl = '/path/to/your/sample-cv.pdf'; // Thay đổi đường dẫn này
    
//     // Tạo một thẻ a ẩn để tải file
//     const link = document.createElement('a');
//     link.href = cvUrl;
//     link.download = 'CV-Mau.pdf'; // Tên file khi tải về
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
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
    darkModeToggle.addEventListener('click', function () {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);

        // Toggle icons
        moonIcon.classList.toggle('hidden');
        sunIcon.classList.toggle('hidden');
    });
    // Toggle mobile mode
    mobileDarkModeToggle.addEventListener('click', function () {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', isDark);

        // Toggle icons
        mobileMoonIcon.classList.toggle('hidden');
        mobileSunIcon.classList.toggle('hidden');
    });

    /// Form gửi tin nhắn
    document.getElementById('contact-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Gửi tin nhắn thành công!');
                this.reset();
            } else {
                alert('Gửi tin nhắn thất bại, vui lòng thử lại!');
            }
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại sau!');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    ///

    // 1. Lấy dữ liệu từ GitHub API
    async function fetchGitHubStats() {
        try {
            const response = await fetch('https://api.github.com/users/DangNguyenVuHoang');
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching GitHub data:', error);
            return null;
        }
    }

    // 2. Animation counter
    function animateCounter(elementId, target, duration = 2000) {
        const element = document.getElementById(elementId);
        const start = 0;
        const increment = target / (duration / 16); // ~60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    // 3. Ước lượng số commit (GitHub API không cung cấp tổng commit)
    async function estimateTotalCommits(username) {
        try {
            const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
            const repos = await reposRes.json();

            let totalCommits = 0;
            // Giới hạn kiểm tra 5 repo đầu để tránh rate limit
            for (const repo of repos.slice(0, 5)) {
                const commitsRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/contributors`);
                const contributors = await commitsRes.json();
                const myContributions = contributors.find(c => c.login === username);
                if (myContributions) totalCommits += myContributions.contributions;
            }

            // Ước lượng cho tất cả repo
            return Math.floor(totalCommits * (repos.length / 5));
        } catch (error) {
            console.error('Error estimating commits:', error);
            return 1200; // Fallback number
        }
    }

    // 4. Khởi tạo
    async function initGitHubStats() {
        const data = await fetchGitHubStats();
        if (data) {
            animateCounter('repo-count', data.public_repos);
            animateCounter('follower-count', data.followers);

            const totalCommits = await estimateTotalCommits('DangNguyenVuHoang');
            animateCounter('commit-count', totalCommits);
        } else {
            // Fallback values nếu API fail
            animateCounter('repo-count', 15);
            animateCounter('follower-count', 42);
            animateCounter('commit-count', 1284);
        }
    }

    // Intersection Observer - Chỉ load khi section hiển thị
    const observer1 = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initGitHubStats();
            observer1.unobserve(entries[0].target);
        }
    }, { threshold: 0.1 });

    observer1.observe(document.getElementById('stats'));

    //////////

    // Greeting Modal Functionality
    class GreetingModal {
        constructor() {
            this.modal = document.getElementById('greeting-modal');
            this.nameInput = document.getElementById('visitor-name');
            this.saveBtn = document.getElementById('save-name-btn');
            this.skipBtn = document.getElementById('skip-btn');
            this.closeBtn = document.getElementById('close-greeting-btn');
            this.nameInputContainer = document.getElementById('name-input-container');
            this.welcomeBackContainer = document.getElementById('welcome-back-container');
            this.savedNameElement = document.getElementById('saved-name');
            this.greetingText = document.getElementById('greeting-text');

            this.init();
        }

        init() {
            const lastShown = localStorage.getItem('greetingLastShown');
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;

            if (!lastShown || (now - lastShown > oneDay)) {
                setTimeout(() => this.showGreeting(), 1000);
            }

            this.setupEvents();
            this.updateGreetingText();
        }

        showGreeting() {
            const savedName = localStorage.getItem('visitorName');

            if (savedName) {
                this.savedNameElement.textContent = savedName;
                this.nameInputContainer.classList.add('hidden');
                this.welcomeBackContainer.classList.remove('hidden');
            } else {
                this.nameInputContainer.classList.remove('hidden');
                this.welcomeBackContainer.classList.add('hidden');
            }

            this.modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        hideGreeting() {
            this.modal.classList.add('hidden');
            document.body.style.overflow = '';
            localStorage.setItem('greetingLastShown', Date.now());
        }

        saveName() {
            const name = this.nameInput.value.trim();
            if (name) {
                localStorage.setItem('visitorName', name);
                this.savedNameElement.textContent = name;
                this.nameInputContainer.classList.add('hidden');
                this.welcomeBackContainer.classList.remove('hidden');
            }
        }

        updateGreetingText() {
            const hour = new Date().getHours();
            let greeting = 'Xin chào';

            if (hour < 11) greeting = 'Chào buổi sáng';
            else if (hour < 13) greeting = 'Chào buổi trưa';
            else if (hour < 18) greeting = 'Chào buổi chiều';
            else greeting = 'Chào buổi tối';

            this.greetingText.textContent = `${greeting}! 👋`;
        }

        setupEvents() {
            this.saveBtn.addEventListener('click', () => this.saveName());
            this.skipBtn.addEventListener('click', () => this.hideGreeting());
            this.closeBtn.addEventListener('click', () => this.hideGreeting());

            this.nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.saveName();
            });

            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.hideGreeting();
            });
        }
    }

    new GreetingModal();

   
});





