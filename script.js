// script.js - Versión con respuestas inteligentes
class WhatsAppChat {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.chatToggle = document.getElementById('chatToggle');
        this.closeChat = document.getElementById('closeChat');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.quickBtns = document.querySelectorAll('.quick-btn');

        // Configuración de WhatsApp
        this.whatsappNumber = '573144160224'; // Cambia por tu número
        this.companyName = 'Tu Empresa';
        this.isConnected = navigator.onLine;

        // Historial de conversación para contexto
        this.conversationHistory = [];
        this.currentTopic = null;

        // Estado del bot
        this.waitingForResponse = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.addBotMessage('¡Hola! 👋 Soy tu asistente virtual para PQRS.\n\n¿Cómo puedo ayudarte hoy?\n\n• Necesitas un <strong>asesor</strong>\n• Tienes una <strong>queja</strong>\n• Consulta <strong>general</strong>');
    }

    bindEvents() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.closeChat.addEventListener('click', () => this.toggleChat());

        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.messageInput.addEventListener('input', (e) => {
            this.toggleSendButton(e.target.value.trim());
        });

        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const message = e.target.dataset.message;
                this.messageInput.value = message;
                this.toggleSendButton(message);
                this.sendMessage();
            });
        });

        window.addEventListener('online', () => {
            this.isConnected = true;
        });
    }

    toggleChat() {
        this.chatContainer.classList.toggle('active');
    }

    toggleSendButton(message) {
        this.sendBtn.disabled = !message || this.waitingForResponse;
        this.messageInput.style.borderColor = message && !this.waitingForResponse ? '#25D366' : '#eee';
    }

    sendMessage() {
        const message = this.messageInput.value.trim().toLowerCase();
        if (!message || this.sendBtn.disabled) return;

        // Agregar al historial
        this.conversationHistory.push({ role: 'user', content: message });

        this.addUserMessage(this.messageInput.value);
        this.messageInput.value = '';
        this.toggleSendButton('');

        // Procesar mensaje con IA
        this.processMessage(message);
    }

    // 🧠 SISTEMA DE RESPUESTAS INTELIGENTES
    async processMessage(userMessage) {
        this.waitingForResponse = true;
        this.toggleSendButton('');

        // Simular tiempo de respuesta
        await this.delay(800 + Math.random() * 1200);

        const response = this.getIntelligentResponse(userMessage);
        this.addBotMessage(response.message);
        this.conversationHistory.push({ role: 'bot', content: response.message });

        // Verificar si necesita escalar a humano
        if (response.escalateToHuman) {
            await this.delay(1000);
            this.escalateToWhatsApp(userMessage);
        }

        this.waitingForResponse = false;
        this.toggleSendButton('');
    }

    getIntelligentResponse(message) {
        const words = message.split(/\s+/);

        // 1. DETECTAR NECESIDAD DE ASESOR (Prioridad máxima)
        if (this.containsAny(message, ['asesor', 'asesora', 'humano', 'persona', 'operador', 'empleado', 'hablar', 'llamar'])) {
            return {
                message: '🔗 Perfecto, te conecto inmediatamente con un <strong>asesor humano</strong> por WhatsApp.',
                escalateToHuman: true
            };
        }

        // 2. PQRS / QUEJAS
        if (this.containsAny(message, ['queja', 'pqrs', 'reclamo', 'problema', 'error', 'falla', 'daño', 'mal', 'incumplimiento'])) {
            this.currentTopic = 'pqrs';
            return {
                message: `📋 ¡Entendido! Has reportado una <strong>PQRS</strong>.<br><br>` +
                        `Para procesar tu queja necesitamos:<br>` +
                        `1️⃣ Tu <strong>nombre completo</strong><br>` +
                        `2️⃣ <strong>Número de cédula</strong><br>` +
                        `3️⃣ <strong>Descripción detallada</strong><br><br>` +
                        `¿Me das esa información o prefieres hablar con un asesor?`,
                escalateToHuman: false
            };
        }

        // 3. CONSULTAS GENERALES
        if (this.containsAny(message, ['consulta', 'pregunta', 'duda', 'saber', 'cómo', 'cuánto', 'precio', 'costo'])) {
            return {
                message: `ℹ️ ¡Claro! Puedo ayudarte con consultas generales.<br><br>` +
                        `Escribe tu pregunta específica o si necesitas atención personalizada, dime "<strong>quiero un asesor</strong>".<br><br>` +
                        `¿Cuál es tu consulta?`,
                escalateToHuman: false
            };
        }

        // 4. HORARIOS Y CONTACTO
        if (this.containsAny(message, ['hora', 'horario', 'abrir', 'cerrar', 'día', 'fin', 'semana'])) {
            return {
                message: `🕒 <strong>Nuestros horarios:</strong><br>` +
                        `Lunes a Viernes: 8:00am - 6:00pm<br>` +
                        `Sábados: 9:00am - 1:00pm<br><br>` +
                        `Fuera de horario, déjanos tu mensaje y te respondemos ASAP.<br><br>` +
                        `¿Necesitas un asesor ahora?`,
                escalateToHuman: false
            };
        }

        // 5. NÚMEROS / CONTACTO
        if (this.containsAny(message, ['teléfono', 'numero', 'contacto', 'whatsapp', 'llamar'])) {
            return {
                message: `📞 <strong>Contacto directo:</strong><br>` +
                        `WhatsApp: <strong>wa.me/573xxxxxxxxx</strong><br>` +
                        `Línea: 601-xxx-xxxx<br><br>` +
                        `¿Quieres que te conecte ahora con un asesor?`,
                escalateToHuman: false
            };
        }

        // 6. DESPEDIDA / CERRAR
        if (this.containsAny(message, ['gracia', 'adiós', 'chao', 'bye', 'cerrar'])) {
            return {
                message: '🙏 ¡Gracias por contactarnos! Si necesitas algo más, aquí estaremos. 😊<br><br>' +
                        '<strong>Botón de asesor disponible 24/7</strong>',
                escalateToHuman: false
            };
        }

        // 7. RESPUESTA POR DEFECTO
        return {
            message: `🤔 Entiendo que necesitas ayuda.<br><br>` +
                    `Escribe una de estas opciones:<br>` +
                    `• "<strong>quiero un asesor</strong>"<br>` +
                    `• "<strong>PQRS</strong>" o "queja"<br>` +
                    `• "<strong>consulta</strong>" + tu pregunta<br><br>` +
                    `O usa los botones rápidos abajo 👇`,
            escalateToHuman: false
        };
    }

    // 🔍 UTILIDADES
    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 📤 ESCALAR A WHATSAPP
    async escalateToWhatsApp(originalMessage) {
        const context = this.buildContextMessage();
        const encodedMessage = encodeURIComponent(context);
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

        await this.delay(800);
        this.addBotMessage(
            `✅ <strong>¡Conexión establecida!</strong><br>` +
            `Abriendo WhatsApp con tu asesor en 3 segundos...<br><br>` +
            `📱 <em>Mantén esta ventana abierta por si necesitas más ayuda</em>`
        );

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000);
    }

    buildContextMessage() {
        let context = `Hola ${this.companyName}! 👋\n\n`;
        
        if (this.conversationHistory.length > 1) {
            context += `📋 <strong>Contexto de la conversación:</strong>\n`;
            this.conversationHistory.slice(-3).forEach((msg, i) => {
                context += `${msg.role === 'user' ? '👤 Cliente' : '🤖 Bot'}: ${msg.content}\n`;
            });
            context += '\n';
        }

        context += `💬 <strong>Mensaje actual:</strong> ${this.conversationHistory[this.conversationHistory.length - 1]?.content || ''}\n\n`;
        context += `⏰ ${new Date().toLocaleString('es-CO')}\n\n`;
        context += `¡Necesito atención humana! 🙏`;

        return context;
    }

    // MENSAJES VISUALES
    addUserMessage(message) {
        const messageDiv = this.createMessageElement(message, 'user-message');
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messageDiv = this.createMessageElement(message, 'bot-message');
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    createMessageElement(message, className) {
        const div = document.createElement('div');
        div.className = `message ${className}`;
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = message.replace(/\n/g, '<br>');
        
        div.appendChild(content);
        return div;
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new WhatsAppChat();
});


// Efecto máquina de escribir SIMPLE
function initTypewriter() {
  const title = document.getElementById('typewriterTitle');
  const cursor = document.getElementById('cursor');
  
  const text = "Convierte mensajes en clientes con tu Chatbot PQRS 🎮";
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      title.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80); // Velocidad de escritura
    } else {
      cursor.style.display = 'none'; // Ocultar cursor al final
    }
  }
  
  // Iniciar después de 500ms
  setTimeout(typeWriter, 500);
}

// Ejecutar cuando cargue la página
document.addEventListener('DOMContentLoaded', initTypewriter);