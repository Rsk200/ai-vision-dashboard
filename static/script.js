document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const uploadPrompt = document.getElementById('upload-prompt');
    const imagePreview = document.getElementById('image-preview');
    const removeBtn = document.getElementById('remove-btn');
    
    const chatBox = document.getElementById('chat-box');
    const questionInput = document.getElementById('question-input');
    const sendBtn = document.getElementById('send-btn');
    
    let currentImageBase64 = null;

    // --- Image Upload Logic ---
    uploadArea.addEventListener('click', () => {
        if (!currentImageBase64) fileInput.click();
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageBase64 = null;
        imagePreview.src = "";
        imagePreview.hidden = true;
        removeBtn.hidden = true;
        uploadPrompt.style.display = "block";
        fileInput.value = "";
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            currentImageBase64 = e.target.result; // This includes data:image/...;base64,
            imagePreview.src = currentImageBase64;
            imagePreview.hidden = false;
            removeBtn.hidden = false;
            uploadPrompt.style.display = "none";
        };
        reader.readAsDataURL(file);
    }

    // --- Chat Logic ---
    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${isUser ? 'user-msg' : 'system-msg'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-content';
        contentDiv.textContent = text;
        
        msgDiv.appendChild(contentDiv);
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        for(let i=0; i<3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingDiv.appendChild(dot);
        }
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function hideTyping() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) typingDiv.remove();
    }

    async function sendMessage() {
        const prompt = questionInput.value.trim();
        if (!prompt) return;

        addMessage(prompt, true);
        questionInput.value = '';
        sendBtn.disabled = true;
        
        showTyping();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt,
                    image: currentImageBase64
                })
            });

            const data = await response.json();
            hideTyping();
            
            if (response.ok) {
                addMessage(data.answer);
            } else {
                addMessage(`Error: ${data.error}`);
            }
        } catch (err) {
            hideTyping();
            addMessage(`Failed to connect to server.`);
        } finally {
            sendBtn.disabled = false;
            questionInput.focus();
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
