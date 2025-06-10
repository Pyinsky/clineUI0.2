// StockArt AI Chat functionality
class StockArtChat {
    constructor() {
        this.config = window.STOCKART_CONFIG;
        this.isLoading = false;
        this.currentRequestId = null;
        
        // DOM elements
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.chatInterface = document.getElementById('chatInterface');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatForm = document.getElementById('chatForm');
        this.chatInput = document.getElementById('chatInput');
        this.chatInputForm = document.getElementById('chatInputForm');
        this.chatInputField = document.getElementById('chatInputField');
        this.backBtn = document.getElementById('backBtn');
        this.clearChatBtn = document.getElementById('clearChatBtn');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.sendBtn = document.getElementById('sendBtn');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // Main search form
        if (this.chatForm) {
            this.chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleInitialQuery();
            });
        }

        // Chat input form
        if (this.chatInputForm) {
            this.chatInputForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFollowUpQuery();
            });
        }

        // Navigation buttons
        if (this.backBtn) {
            this.backBtn.addEventListener('click', () => this.showWelcomeScreen());
        }

        if (this.clearChatBtn) {
            this.clearChatBtn.addEventListener('click', () => this.clearChat());
        }

        if (this.newChatBtn) {
            this.newChatBtn.addEventListener('click', () => this.showWelcomeScreen());
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Cmd/Ctrl + K to focus search
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (this.welcomeScreen.style.display !== 'none') {
                    this.chatInput?.focus();
                } else {
                    this.chatInputField?.focus();
                }
            }

            // Escape to go back
            if (e.key === 'Escape' && this.chatInterface.style.display !== 'none') {
                this.showWelcomeScreen();
            }
        });
    }

    async handleInitialQuery() {
        const query = this.chatInput?.value?.trim();
        if (!query) return;

        this.showChatInterface();
        this.addMessage('user', query);
        this.chatInput.value = '';
        
        await this.sendToAI(query);
    }

    async handleFollowUpQuery() {
        const query = this.chatInputField?.value?.trim();
        if (!query || this.isLoading) return;

        this.addMessage('user', query);
        this.chatInputField.value = '';
        
        await this.sendToAI(query);
    }

    async sendToAI(query) {
        this.setLoading(true);
        this.addTypingIndicator();

        try {
            const response = await this.makeAPIRequest(query);
            this.removeTypingIndicator();
            
            if (response.success) {
                this.addMessage('ai', response.response);
            } else {
                this.addMessage('ai', `I apologize, but I encountered an error: ${response.error}. Please try again.`, true);
            }
        } catch (error) {
            this.removeTypingIndicator();
            console.error('Chat error:', error);
            this.addMessage('ai', 'I apologize, but I\'m having trouble connecting to my AI systems right now. Please try again in a moment.', true);
        } finally {
            this.setLoading(false);
        }
    }

    async makeAPIRequest(query) {
        const requestId = Date.now().toString();
        this.currentRequestId = requestId;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.API.TIMEOUT);

        try {
            const response = await fetch(this.config.API.N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: query,
                    timestamp: new Date().toISOString(),
                    requestId: requestId
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timed out. Please try again.');
            }
            
            throw error;
        }
    }

    addMessage(type, content, isError = false) {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}-message ${isError ? 'error-message' : ''}`;
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageEl.innerHTML = `
            <div class="message-content">
                <div class="message-text">${this.formatMessage(content)}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;

        this.chatMessages.appendChild(messageEl);
        this.scrollToBottom();

        // Animate in
        requestAnimationFrame(() => {
            messageEl.classList.add('message-visible');
        });

        return messageEl;
    }

    formatMessage(content) {
        // Basic markdown-like formatting
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    addTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.className = 'message ai-message typing-indicator';
        typingEl.id = 'typingIndicator';
        
        typingEl.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        this.chatMessages.appendChild(typingEl);
        this.scrollToBottom();

        requestAnimationFrame(() => {
            typingEl.classList.add('message-visible');
        });
    }

    removeTypingIndicator() {
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) {
            typingEl.remove();
        }
    }

    setLoading(loading) {
        this.isLoading = loading;
        
        if (this.sendBtn) {
            this.sendBtn.disabled = loading;
            this.sendBtn.classList.toggle('loading', loading);
        }
        
        if (this.chatInputField) {
            this.chatInputField.disabled = loading;
        }
    }

    showChatInterface() {
        this.welcomeScreen.style.display = 'none';
        this.chatInterface.style.display = 'flex';
        
        // Focus the chat input
        setTimeout(() => {
            this.chatInputField?.focus();
        }, 100);
    }

    showWelcomeScreen() {
        this.chatInterface.style.display = 'none';
        this.welcomeScreen.style.display = 'block';
        
        // Focus the main search input
        setTimeout(() => {
            this.chatInput?.focus();
        }, 100);
    }

    clearChat() {
        if (confirm('Are you sure you want to clear this conversation?')) {
            this.chatMessages.innerHTML = '';
            this.showWelcomeScreen();
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, this.config.UI.AUTO_SCROLL_DELAY);
    }
}

// Initialize chat when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.stockArtChat = new StockArtChat();
});
