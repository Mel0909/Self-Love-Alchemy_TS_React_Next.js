"use client";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import styles from "./Header.module.css";

export default function Header({ onOpenCart, onOpenLogin }: any) {
  const { usuario } = useAuth();
  const { carrinho } = useCart();
  const numCarrinho = carrinho?.length || 0;
  
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img src="/imgs/simbolos/logo.png" alt="Logo" className={styles.logoImg} />
        <h1 className={styles.nome}>Self-Love Alchemy</h1>
      </div>

      <button className={styles.menuMobileBtn} onClick={toggleMenu}>
        ☰
      </button>

      <div className={`${styles.headerRight} ${menuAberto ? styles.headerRightActive : ""}`}>
        
        <div className={styles.user} onClick={() => {
          onOpenLogin();
          setMenuAberto(false);
        }}>
          <img src="/imgs/simbolos/perfil.png" alt="Perfil" className={styles.userImg} />
          
          <span className={styles.userName}>
            {usuario?.nome ? `Oi, ${usuario.nome}!` : "Bruxinha"}
          </span>
          
          <span className={styles.menuText}>
            Minha Conta
          </span>
        </div>
        
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