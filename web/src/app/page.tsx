"use client";

import Header from "./(frontend)/components/Header";

export default function Home() {
  const abrirCarrinho = () => console.log("Caldeirão aberto!");
  const abrirLogin = () => console.log("Sintonizando magia...");

  return (
    <main>
      <Header onOpenCart={abrirCarrinho} onOpenLogin={abrirLogin} />
      
      <div style={{ padding: "40px", textAlign: "center", color: "#4A235A" }}>
        <h2 style={{ fontFamily: "serif", fontSize: "2rem" }}>
          Bem-vinda ao Coven, Mel! ✨
        </h2>
        <p>O Header acima já está sintonizado com o MagicContext.</p>
      </div>
    </main>
  );
}