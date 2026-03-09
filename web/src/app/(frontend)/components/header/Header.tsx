"use client";
import { useState } from "react";
import { useMagic } from "../../contexts/MagicContext";
import styles from "./Header.module.css";

export default function Header({ onOpenCart, onOpenLogin }: any) {
  const { usuario, carrinho } = useMagic();
  const [menuAberto, setMenuAberto] = useState(false);

  const numCarrinho = carrinho?.length || 0;
  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <header className={styles.header}>
      {/* Esquerda: Logo */}
      <div className={styles.headerLeft}>
        <img src="/imgs/simbolos/logo.png" alt="Logo" className={styles.logoImg} />
        <h1 className={styles.nome}>Self-Love Alchemy</h1>
      </div>

      {/* Mobile Toggle */}
      <button className={styles.menuMobileBtn} onClick={toggleMenu}>☰</button>

      {/* Direita: Nav */}
      <div className={`${styles.headerRight} ${menuAberto ? styles.headerRightActive : ""}`}>
        
        {/* User Profile / Login */}
        <div className={styles.user} onClick={() => { onOpenLogin(); setMenuAberto(false); }}>
          <img src="/imgs/simbolos/perfil.png" alt="Perfil" className={styles.userImg} />
          <span className={styles.userName}>
            {usuario?.nome ? `Oi, ${usuario.nome}!` : "Bruxinha"}
          </span>
          <span className={styles.menuText}>Minha Conta</span>
        </div>
        
        {/* Carrinho */}
        <div className={styles.carrinhoContainer} onClick={() => { onOpenCart(); setMenuAberto(false); }}>
          <img src="/imgs/simbolos/carrinho.png" alt="Carrinho" className={styles.carrinhoImg} />
          <span className={styles.menuText}>Meu Caldeirão</span>
          {numCarrinho > 0 && <span className={styles.numCarrinho}>{numCarrinho}</span>}
        </div>

      </div>
    </header>
  );
}