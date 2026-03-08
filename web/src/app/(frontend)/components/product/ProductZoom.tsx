"use client";
import { useMagic } from "../../contexts/MagicContext";
import styles from "./ProductZoom.module.css";

export default function ProductZoom({ produto, onClose }: any) {
  const { adicionarAoCarrinho } = useMagic();

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeModal} onClick={onClose}>×</button>
        
        <div className={styles.modalBody}>
          <div className={styles.modalImg}>
            <img src={produto.imagem} alt={produto.nome} />
          </div>
          
          <div className={styles.modalDesc}>
            <div className={styles.modalInfo}>
              <span className={styles.categoryTag}>{produto.categoria}</span>
              <h2>{produto.nome}</h2>
              <p className={styles.fullDescription}>{produto.desc}</p>
            </div>

            <div className={styles.modalCompra}>
              <p className={styles.price}>R$ {produto.preco}</p>
              <button 
                className={styles.addToCartBtn}
                onClick={() => {
                  adicionarAoCarrinho(produto);
                  onClose();
                }}
              >
                Colocar no Caldeirão ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}