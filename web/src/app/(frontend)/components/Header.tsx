"use client";
import { useState } from "react";
import { useMagic } from "../contexts/MagicContext";
import styles from "./Header.module.css";

export default function Header({ onOpenCart, onOpenLogin }: any) {
  const { usuario, carrinho } = useMagic();
  const numCarrinho = carrinho?.length || 0;
  
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className={styles.header}>
      {/* Esquerda: Logo e Nome */}
      <div className={styles.headerLeft}>
        <img src="/imgs/simbolos/logo.png" alt="Logo" className={styles.logoImg} />
        <h1 className={styles.nome}>Self-Love Alchemy</h1>
      </div>

      {/* Botão Mobile */}
      <button className={styles.menuMobileBtn} onClick={toggleMenu}>
        ☰
      </button>

      {/* Direita: Menu (Desktop e Mobile) */}
      <div className={`${styles.headerRight} ${menuAberto ? styles.headerRightActive : ""}`}>
        
        {/* User / Login */}
        <div className={styles.user} onClick={() => {
          onOpenLogin();
          setMenuAberto(false);
        }}>
          <img src="/imgs/simbolos/perfil.png" alt="Perfil" className={styles.userImg} />
          
          {/* 1. Este é o texto do Desktop (Fica embaixo do ícone) */}
          <span className={styles.userName}>
            {usuario?.nome ? `Oi, ${usuario.nome}!` : ""}
          </span>
          
          {/* 2. Este é o texto do Mobile (Fica grandão no menu lateral) */}
          <span className={styles.menuText}>
            Minha Conta
          </span>
        </div>
        
        {/* Carrinho */}
        <div className={styles.carrinhoContainer} onClick={() => {
          onOpenCart();
          setMenuAberto(false);
        }}>
          <img src="/imgs/simbolos/carrinho.png" alt="Carrinho" className={styles.carrinhoImg} />
          <span className={styles.menuText}>Meu Caldeirão</span>
          <span className={styles.numCarrinho}>{numCarrinho}</span> 
        </div>

      </div>
    </header>
  );
}