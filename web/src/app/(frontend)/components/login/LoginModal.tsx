"use client";
import { useState } from "react";
import { useMagic } from "../../contexts/MagicContext";
import { useToast } from "../../contexts/ToastContext";
import styles from "./LoginModal.module.css";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const { usuario, cadastrar, entrar, deslogar } = useMagic();
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailCompleto = email + "@gmail.com";

    if (isLogin) {
      if (entrar(emailCompleto, senha)) {
        addToast(`Bem-vinda de volta ao coven!`);
        onClose();
      }
    } else {
      if (!nome) return addToast("Preencha seu nome de bruxa!");
      if (cadastrar(nome, emailCompleto, senha)) {
        addToast("Grimório criado com sucesso!");
        onClose();
      }
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeModal} onClick={onClose}>&times;</button>
        <div className={styles.modalLoginBody}>
          <img src="/imgs/simbolos/bruxinha.png" alt="Bruxinha" className={styles.loginImg} />

          {usuario ? (
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h2 className={styles.modalTitle}>Olá, Bruxa {usuario.nome}!</h2>
              <p>Sua conta está ativa e sua magia está carregada.</p>
              <button className={styles.loginBtn} onClick={() => { deslogar(); addToast("Sessão encerrada!"); onClose(); }}>Sair da Conta</button>
            </div>
          ) : (
            <>
              <h2 className={styles.modalTitle}>{isLogin ? "Bem-vinda de volta" : "Nova Bruxinha"}</h2>
              <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                {!isLogin && (
                  <input type="text" placeholder="Nome de bruxa" className={styles.inputMagico} value={nome} onChange={(e) => setNome(e.target.value)} required />
                )}
                <div className={styles.emailWrapper}>
                  <input type="text" placeholder="correio mágico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <span className={styles.sufixo}>@gmail.com</span>
                </div>
                <input type="password" placeholder="Palavra mágica" className={styles.inputMagico} value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <button type="submit" className={styles.loginBtn}>{isLogin ? "Entrar no Caldeirão" : "Criar Grimório"}</button>
              </form>
              <p className={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Quero me tornar uma bruxinha" : "Já sou uma bruxinha"}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}