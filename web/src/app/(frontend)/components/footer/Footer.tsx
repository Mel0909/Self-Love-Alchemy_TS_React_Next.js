"use client";
import { useState } from "react";
import Contato from "./Contato";
import Assinatura from "./Assinatura";
import HistoryModal from "./HistoryModal";
import styles from "./Footer.module.css";

export default function Footer() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <footer className={styles.alchemyFooter}>
      <div className={styles.footerContainer}>
        <Contato onOpenHistory={() => setIsHistoryOpen(true)} />
        <Assinatura />
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2026 Self-Love Alchemy. Cultivando a magia interior.</p>
      </div>

      {isHistoryOpen && <HistoryModal onClose={() => setIsHistoryOpen(false)} />}
    </footer>
  );
}