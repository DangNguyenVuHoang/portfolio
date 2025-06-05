 document.addEventListener('DOMContentLoaded', function () {
 // DOM Elements
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatIcon = document.getElementById('chat-icon');
    const closeIcon = document.getElementById('close-icon');
    const minimizeBtn = document.getElementById('minimize-chat');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // State
    let isChatOpen = false;
    let isProcessing = false;

    // Toggle Chat Window
    chatbotToggle.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        chatbotWindow.classList.toggle('hidden', !isChatOpen);
        chatIcon.classList.toggle('hidden', isChatOpen);
        closeIcon.classList.toggle('hidden', !isChatOpen);

        if (isChatOpen) {
            chatbotWindow.style.transform = 'translateY(20px)';
            setTimeout(() => {
                chatbotWindow.style.transform = 'translateY(0)';
            }, 10);
        }
    });

    // Minimize Chat
    minimizeBtn.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
        chatIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        isChatOpen = false;
    });

    // Send Message
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '' || isProcessing) return;

        // Add user message to chat
        addMessage(message, 'user');
        userInput.value = '';
        isProcessing = true;

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-message bot-message';
        typingIndicator.innerHTML = `
      <div class="message-content bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-lg">
        <div class="flex space-x-2">
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            // Remove typing indicator
            typingIndicator.remove();

            // Get bot response
            const response = getBotResponse(message);
            addMessage(response, 'bot');
            isProcessing = false;
        }, 1000 + Math.random() * 2000); // Random delay 1-3s
    }

    // Handle Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Handle Send button click
    sendBtn.addEventListener('click', sendMessage);

    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message mb-2`;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
      <div class="message-content ${sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} p-3 rounded-lg">
        ${content}
      </div>
      <div class="message-time text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">${timeString}</div>
    `;

        // Remove typing indicator if exists
        const typingIndicators = document.querySelectorAll('.chat-message .flex.space-x-2');
        typingIndicators.forEach(indicator => indicator.parentElement.parentElement.remove());

        chatMessages.appendChild(messageDiv);

        // Scroll to bottom smoothly
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }

function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    const chatState = {
    loveTopic: false,
    loveLevel: 0,
    userConfession: false
};

    // === GENERAL QUESTIONS ===
    if (lowerMsg.includes('giới thiệu') || lowerMsg.includes('bạn là ai')) {
        return "Tôi là trợ lý ảo của Đặng Nguyễn Vũ Hoàng - một Full-stack Developer với kinh nghiệm phát triển web và ứng dụng di động. Hoàng hiện tập trung vào Reactjs và Javascript định hướng phát triển tương lai sẽ học thêm về Node.js, Java Spring Boot và những kiến thức về BackEnd.";
    }
    else if (lowerMsg.includes('học vấn') || lowerMsg.includes('education level')) {
        return "Hoàng đã tốt nghiệp ngành công nghệ thông tin tại trường ĐH FPT. Có chứng chỉ giao tiếp tiếng Nhật tại FPT Academy Japan. Có khả năng đọc tài liệu tiếng anh và giao tiếp tiếng anh một cách cơ bản.";
    }
    else if (lowerMsg.includes('kinh nghiệm') || lowerMsg.includes('experience')) {
        return "Hoàng có kinh nghiệm làm việc về các dự án liên quan đến Framework Reactjs và từng đã học kiến thức về Java nên cũng có cá bài tập nhỏ về lập trình Android. Có kinh nghiệm phân tích dự án công nghệ và viết bản kế hoạch để phát triển dự án(SRS). Bạn có thể xem chi tiết trong phần 'Giới thiệu' trên portfolio.";
    }
    else if (lowerMsg.includes('dự án') || lowerMsg.includes('project')) {
        return "Một số dự án nổi bật của Hoàng bao gồm: Hệ thống quản hỗ trợ khách hàng OCOP lưu trữ hàng và vận chuyển áp dụng theo mô hình Dark Store, Portfolio cá nhân giới thiệu về bản thân, NextJS Templates luyện tập tạo dựng giao diện trực quan về cách bố trí và hiển thị. Bạn có thể xem chi tiết trong phần 'Dự án'.";
    }
    else if (lowerMsg.includes('kỹ năng') || lowerMsg.includes('skill')) {
        return "Các kỹ năng chính của Hoàng: Front-end (React, Tailwind CSS), Back-end (JavaScript, Spring Boot), Mobile (Flutter), và Chứng chỉ tiếng Nhật tươnng đương N4. Xem thêm trong phần 'Kỹ năng' nhé!";
    }
    else if (lowerMsg.includes('liên hệ') || lowerMsg.includes('contact')) {
        return "Bạn có thể liên hệ với Hoàng qua email: dangnguyenvuhoang8384@gmail.com hoặc số điện thoại: +84 346 711 532. Tất cả thông tin có trong phần 'Liên hệ'.";
    }


    // === NEW LOVE TOPIC INITIATION ===
    if (lowerMsg.includes('yêu') || lowerMsg.includes('người yêu') || lowerMsg.includes('thích')|| lowerMsg.includes('tình cảm') || lowerMsg.includes('cô đơn') || 
        lowerMsg.includes('lover') || lowerMsg.includes('relationship') || lowerMsg.includes('buồn')) {
        chatState.loveTopic = true;
        chatState.loveLevel = 1;
        return "Hoàng hiện đang độc thân nè 💖. Bạn hỏi vậy... là có ý gì đặc biệt à? 😊";
    }
    else if (lowerMsg.includes('hẹn hò') || lowerMsg.includes('date') || lowerMsg.includes('gặp mặt')) {
        chatState.loveTopic = true;
        chatState.loveLevel = 1;
        return `Ồ! Bạn muốn gặp Hoàng à? 😊\nHiện tại Hoàng đang tập trung vào công việc phát triển bản thân...`;
    }
    else if (lowerMsg.includes('Hường') || lowerMsg.includes('Huong') || lowerMsg.includes('hương') || lowerMsg.includes('huong')) {
        chatState.loveTopic = true;
        chatState.loveLevel = 1;
        return 'Rất vui khi em đã tìm kiếm từ khoá đặc biệt này. Anh thiết lập từ khoá này để mong sẽ được em để ý đến mình nhiều hơn. Hy vọng, anh có thể bắt đầu trò chuyện với em hằng ngày và hằng giờ. Bắt đầu một mối quan hệ được cho là gì đó nghiêm túc và đặc biệt hơn. Em hãy cho anh cơ hội làm quen em nhé? 💖';
    }
    else if (lowerMsg.includes('Oke') || lowerMsg.includes('oke')  || lowerMsg.includes('có') || lowerMsg.includes('co') || lowerMsg.includes('được rồi') || lowerMsg.includes('ừ') || lowerMsg.includes('ưm') || lowerMsg.includes('ừm')|| lowerMsg.includes('duoc roi')) {
        chatState.loveTopic = true;
        chatState.loveLevel = 1;
        return 'Cảm ơn em rất nhiều, từ giờ anh hứa sẽ cố gắng. Sẽ không làm Hường thất vọng nữa, đồng thời anh chắc chắn rằng mình sẽ nghiêm túc khi quen em và không làm phụ lòng kỳ vọng của em. 😚 💖';
    }
    else if (lowerMsg.includes('hông') || lowerMsg.includes('khong') || lowerMsg.includes('không') || lowerMsg.includes('hong') || lowerMsg.includes('ko')){
        chatState.loveTopic = true;
        chatState.loveLevel = 1;
        return 'Hãy cho anh cơ hội làm quen em đi mà, anh năng nỉ đó! 🥹 🥹';
    }

    else if (lowerMsg.includes('cưới') || lowerMsg.includes('marry') || lowerMsg.includes('kết hôn')) {
        return `Wow, nghiêm túc vậy sao? 💍\nHoàng nghĩ hôn nhân là chuyện hệ trọng đời người...`;
    }
    else if (lowerMsg.includes('tán') || lowerMsg.includes('flirt') || lowerMsg.includes('tỏ tình')) {
        chatState.loveTopic = true;
        chatState.loveLevel = 1;
        return `Bạn rất dễ thương đấy! 😊\nNhưng Hoàng nghĩ chúng ta nên tìm hiểu nhau nhiều hơn...`;
    }

    // === DEFAULT RESPONSES ===
    const randomResponses = [
        "Tôi không chắc mình hiểu câu hỏi của bạn. Bạn có thể hỏi về thông tin portfolio, kinh nghiệm làm việc hoặc dự án cá nhân của Hoàng nhé!",
        "Xin lỗi, tôi chỉ có thể trả lời các câu hỏi liên quan đến portfolio của Hoàng. Bạn muốn biết điều gì về kỹ năng hoặc dự án của ấy?",
        "Câu hỏi của bạn khá thú vị! Hiện tôi chỉ được lập trình để trả lời các thắc mắc về chuyên môn của Hoàng thôi."
    ];
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}

    // Auto-open after 30 seconds if not interacted
    setTimeout(() => {
        if (!localStorage.getItem('chatbotShown')) {
            chatbotToggle.click();
            localStorage.setItem('chatbotShown', 'true');
        }
    }, 30000);
});