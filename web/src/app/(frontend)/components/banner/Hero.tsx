"use client";
import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

const frases = [
  "O universo reservou um brilho especial para você hoje. ✨",
  "Que tal manifestar um mimo para a sua melhor versão?",
  "Sua intuição te trouxe ao lugar certo. Sinta a energia!",
  "Não é apenas autocuidado, é a sua própria alquimia em movimento.",
  "As estrelas confirmam: você merece um momento de paz e magia. 🌙",
  "Alinhando os chakras e as intenções para o dia de hoje.",
  "Sua aura brilha mais forte quando você decide se priorizar.",
  "Transforme sua rotina em um ritual de amor próprio. 🔮",
  "Manifestando abundância, proteção e muitos cristais no seu caminho.",
  "Lembre-se: a magia mais poderosa é aquela que vem de dentro.",
  "Que sua única dúvida hoje seja qual essência combina com seu humor. ✨",
  "Status: Conectada com a abundância do universo."
];

export default function Hero() {
  const [fraseDaSorte, setFraseDaSorte] = useState("Sintonizando sua frequência...");

  const sortearFrase = () => {
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    setFraseDaSorte(frases[indiceAleatorio]);
  };

  useEffect(() => {
    sortearFrase();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Manifeste Sua Melhor Versão</h1>
        <p className={styles.luckyPhrase}>{fraseDaSorte}</p>
        
        <button className={styles.btnHero} onClick={sortearFrase}>
          Explore sua magia
        </button>
      </div>
    </section>
  );
}