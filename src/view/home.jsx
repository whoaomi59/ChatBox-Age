import { useEffect, useState } from "react";
import ChatBox from "../components/chat";

export default function Home() {
  const text = "Convierte mensajes en clientes con tu Chatbot PQRS 🚀";

  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayText(text.substring(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white">
        {/* BLUR EFFECTS */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-12 items-center">
          {/* TEXTO */}
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              {displayText}
              <span className="animate-pulse">|</span>
            </h1>

            <p className="text-lg opacity-90 mb-8 max-w-lg">
              Automatiza tu atención, responde en segundos y convierte cada
              mensaje en una venta.
            </p>

            {/* BOTONES */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => document.querySelector(".chat-toggle")?.click()}
                className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition"
              >
                🚀 Probar Demo
              </button>

              <a
                href="https://wa.me/573144160224"
                target="_blank"
                className="bg-black/20 backdrop-blur px-6 py-3 rounded-xl hover:bg-black/30 transition"
              >
                💬 WhatsApp
              </a>
            </div>

            <p className="text-sm mt-6 opacity-80">
              +50 negocios ya automatizan su atención
            </p>
          </div>

          {/* MOCK CHAT */}
          <div className="bg-white rounded-2xl shadow-2xl p-5 text-gray-800 hover:scale-105 transition">
            <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-sm font-semibold">
              💬 Chat en vivo
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-gray-200 p-2 rounded-lg w-fit">
                Hola 👋 ¿tienen servicio hoy?
              </div>

              <div className="bg-green-500 text-white p-2 rounded-lg w-fit ml-auto">
                ¡Claro! Estamos disponibles 🙌
              </div>

              <div className="bg-gray-200 p-2 rounded-lg w-fit">
                Quiero hacer una PQRS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-6">Estás perdiendo clientes 😬</h2>

        <p className="text-gray-600 mb-12">
          Cada mensaje sin responder = dinero perdido
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            "⏳ Respuesta lenta",
            "😡 Clientes molestos",
            "💸 Ventas perdidas",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Lo que obtienes</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              ["⚡", "Respuesta inmediata", "Atiende 24/7"],
              ["📊", "Gestión PQRS", "Todo organizado"],
              ["📲", "Escala a humano", "WhatsApp integrado"],
            ].map(([icon, title, desc], i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white shadow-xl hover:scale-105 transition"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Empieza hoy 🚀</h2>

        <p className="mb-8 opacity-90">Automatiza tu negocio en menos de 24h</p>

        <button
          onClick={() => document.querySelector(".chat-toggle")?.click()}
          className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition"
        >
          Probar ahora
        </button>
      </section>

      <ChatBox />
    </div>
  );
}
