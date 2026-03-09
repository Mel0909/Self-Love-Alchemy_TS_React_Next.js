"use client";
import { useMagic } from "../../contexts/MagicContext";
import CartItem from "./CartItem";
import styles from "./CartDrawer.module.css";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { carrinho } = useMagic();

  const total = carrinho.reduce((acc, item) => {
    const preco = parseFloat(item.preco.replace(",", "."));
    return acc + (preco * item.quantidade);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeModal} onClick={onClose}>&times;</button>
        
        <h2 className={styles.modalTitle}>Seu Caldeirão ✨</h2>

        <div className={styles.cartItemsContainer}>
          {carrinho.length === 0 ? (
            <p style={{textAlign: 'center', color: '#999', padding: '40px 0'}}>
              Seu caldeirão está vazio...
            </p>
          ) : (
            carrinho.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {carrinho.length > 0 && (
          <div className={styles.cartFooter}>
            <div className={styles.totalContainer}>
              <span>Total:</span>
              <span className={styles.totalPrice}>R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>
            <button className={styles.checkoutBtn}>Finalizar Magia</button>
          </div>
        )}
      </div>
    </div>
  );
}