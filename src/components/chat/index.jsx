import { useState, useEffect, useRef } from "react";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "¡Hola! 👋\n\nSoy tu asistente PQRS.\n\n• Asesor\n• Queja\n• Consulta",
    },
  ]);
  const [waiting, setWaiting] = useState(false);

  const chatRef = useRef(null);
  console.log(isOpen);
  // CONFIG
  const whatsappNumber = "573144160224";
  const companyName = "Nombre Empresa";

  // AUTO SCROLL
  useEffect(() => {
    if (isOpen && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // UTILIDADES
  const containsAny = (text, keywords) =>
    keywords.some((k) => text.includes(k));

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // RESPUESTAS INTELIGENTES
  const getResponse = (msg) => {
    msg = msg.toLowerCase();

    if (
      containsAny(msg, ["asesor", "humano", "persona", "operador", "hablar"])
    ) {
      return {
        text: "🔗 Te conecto con un asesor por WhatsApp...",
        escalate: true,
      };
    }

    if (containsAny(msg, ["queja", "pqrs", "reclamo", "problema", "error"])) {
      return {
        text: "📋 Has iniciado una PQRS.\n\nNecesitamos:\n1️⃣ Nombre\n2️⃣ Cédula\n3️⃣ Descripción\n\n¿Deseas asesor?",
        escalate: false,
      };
    }

    if (containsAny(msg, ["consulta", "pregunta", "duda", "precio"])) {
      return {
        text: "ℹ️ Haz tu consulta o escribe 'asesor' para atención personalizada.",
        escalate: false,
      };
    }

    if (containsAny(msg, ["hora", "horario"])) {
      return {
        text: "🕒 Lunes a Viernes 8am - 6pm\nSábado 9am - 1pm\n\n¿Necesitas asesor?",
        escalate: false,
      };
    }

    return {
      text: "🤔 Opciones:\n• asesor\n• pqrs\n• consulta\n\nO usa los botones 👇",
      escalate: false,
    };
  };

  // ENVIAR MENSAJE
  const sendMessage = async (customMsg = null) => {
    const msg = (customMsg || message).trim();
    if (!msg || waiting) return;

    setMessages((prev) => [...prev, { type: "user", text: msg }]);
    setMessage("");
    setWaiting(true);

    await delay(800);

    const res = getResponse(msg);

    setMessages((prev) => [...prev, { type: "bot", text: res.text }]);

    if (res.escalate) {
      await delay(800);
      openWhatsApp();
    }

    setWaiting(false);
  };

  // WHATSAPP
  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hola ${companyName}, necesito atención humana`,
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <>
      {/* BOTÓN */}
      <div className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {/* CHAT */}
      {isOpen && (
        <div className={`chat-container ${isOpen ? "active" : ""}`}>
          <div className="chat-header">
            <span>💬 PQRS</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          {/* MENSAJES */}
          <div className="chat-messages" ref={chatRef}>
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.type}-message`}>
                <div className="message-content">
                  {m.text.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!message || waiting}
              >
                Enviar
              </button>
            </div>

            {/* BOTONES RÁPIDOS */}
            <div className="quick-actions">
              <button onClick={() => sendMessage("asesor")}>Asesor</button>
              <button onClick={() => sendMessage("pqrs")}>PQRS</button>
              <button onClick={() => sendMessage("consulta")}>Consulta</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
