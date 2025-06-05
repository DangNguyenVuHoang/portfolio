document.addEventListener('DOMContentLoaded', function () {
    // Đối tượng chứa các bản dịch
    const translations = {
        vi: {
            home: "Trang chủ",
            about: "Giới thiệu",
            skills: "Kỹ năng",
            projects: "Dự án",
            contact: "Liên hệ",
            activities: "Hoạt động",


            // Thêm các bản dịch khác tại đây
            //Lời chào đầu tiên
            // ... các bản dịch hiện có ...
            greeting: "Xin chào! 👋",
            name_placeholder: "Tên của bạn là...",
            save_name: "Lưu tên",
            skip: "Bỏ qua",
            welcome_back: "Chào mừng trở lại, {name}!",
            close: "Đóng",
            //Thẻ hero đầu tiên
            hello: "Xin chào, tôi là",
            myname: "Đặng Nguyễn Vũ Hoàng",
            position: "Software Engineer & Developer",
            intro: "Là một sinh viên ngành công nghệ thông tin vừa mới tốt đại học. Chuyên ngành hẹp mảng công nghệ thông tin của tôi là về kỹ thuật phần mềm.",
            contact_me: "Liên hệ với tôi",
            view_projects: "Dự án của tôi",
            /// About
            
        },
        en: {
            home: "Home",
            about: "About",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact",
            activities: "Activities",

            // Thêm các bản dịch khác tại đây
            //Lời chào đầu tiên
            greeting: "Hello! 👋",
            name_placeholder: "Your name is...",
            save_name: "Save name",
            skip: "Skip",
            welcome_back: "Welcome back, {name}!",
            close: "Close",
            //Thẻ hero đầu tiên
            hello: "Hello, I'm",
            myname: "Dang Nguyen Vu Hoang",
            position: "Software Engineer & Developer",
            intro: "I'm a recent IT graduate specializing in software engineering. My focused area in information technology is software development.",
            contact_me: "Contact me",
            view_projects: "My projects",
            ///about
   
        },
        ja: {
            home: "ホーム",
            about: "自己紹介",
            skills: "スキル",
            projects: "プロジェクト",
            contact: "連絡先",
            activities: "仕事",

            // Thêm các bản dịch khác tại đây
            // Lời chào đầu tiên
            greeting: "こんにちは！ 👋",
            name_placeholder: "あなたの名前は...",
            save_name: "名前を保存",
            skip: "スキップ",
            welcome_back: "おかえりなさい、{name}さん！",
            close: "閉じる",
            //Thẻ hero đầu tiên
            hello: "こんにちは、私は",
            myname: "ダン・ホアン",
            position: "ソフトウェアエンジニア & デベロッパー",
            intro: "私はソフトウェア工学を専門とする新卒のIT学生です。情報技術における私の専門分野はソフトウェア開発です。",
            contact_me: "お問い合わせ",
            view_projects: "私のプロジェクト",
            //about

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
    document.addEventListener('DOMContentLoaded', function () {
        // Lấy ngôn ngữ từ localStorage hoặc mặc định là 'vi'
        const savedLang = localStorage.getItem('language') || 'vi';
        updateLanguage(savedLang);
    });

    // Lấy các phần tử DOM cho dropdown ngôn ngữ
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const languageArrow = document.getElementById('language-arrow');
    // const currentLanguage = document.getElementById('current-language');



    // Toggle dropdown ngôn ngữ
    languageToggle.addEventListener('click', function (e) {
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
    document.addEventListener('click', function () {
        hideLanguageDropdown();
    });

    // Xử lý khi chọn ngôn ngữ
    document.querySelectorAll('#language-dropdown button').forEach(button => {
        button.addEventListener('click', function () {
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
});