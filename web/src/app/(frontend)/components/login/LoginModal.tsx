"use client";
import { useState } from "react";
import { useMagic } from "../../contexts/MagicContext";
import styles from "./LoginModal.module.css";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [nomeDigitado, setNomeDigitado] = useState("");
  const { usuario, logar, deslogar } = useMagic();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nomeFinal = nomeDigitado || "Bruxinha";
    
    logar(nomeFinal); 
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeModal} onClick={onClose}>&times;</button>
        
        <div className={styles.modalLoginBody}>
          <img src="/imgs/simbolos/bruxinha.png" alt="Bruxinha" className={styles.loginImg} />

          {usuario ? (
            <div style={{ textAlign: 'center' }}>
              <h2 className={styles.modalTitle}>Sua Estante Mágica ✨</h2>
              <p style={{ color: '#4A235A', marginBottom: '25px', fontFamily: 'Poppins' }}>
                Bem-vinda de volta, <strong>{usuario.nome}</strong>!
              </p>
              <button className={styles.loginBtn} onClick={() => { deslogar(); onClose(); }}>
                Sair do Círculo 🌙
              </button>
            </div>
          ) : (
            <>
              <h2 className={styles.modalTitle}>
                {isLogin ? "Acesso ao Coven" : "Nova Aprendiz"}
              </h2>

              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                {!isLogin && (
                  <input 
                    type="text" 
                    placeholder="Seu nome" 
                    className={styles.inputMagico} 
                    value={nomeDigitado}
                    onChange={(e) => setNomeDigitado(e.target.value)}
                    required 
                  />
                )}

                <div className={styles.emailWrapper}>
                  <input type="text" placeholder="Correio mágico" required />
                  <span className={styles.sufixo}>@gmail.com</span>
                </div>

                <input 
                  type="password" 
                  placeholder="Palavra mágica" 
                  className={styles.inputMagico} 
                  required 
                />

                <button type="submit" className={styles.loginBtn}>
                  {isLogin ? "Entrar no Círculo" : "Manifestar Conta"}
                </button>
              </form>

              <p className={styles.toggleLink} onClick={() => {
                setIsLogin(!isLogin);
                setNomeDigitado("");
              }}>
                {isLogin ? "Ainda não tem um grimório? Crie sua conta" : "Já é do coven? Faça seu login"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}