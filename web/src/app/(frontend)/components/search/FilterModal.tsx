"use client";
import { produtos } from "@/data/produtos";
import styles from "./FilterModal.module.css";

interface FilterModalProps {
  onClose: () => void;
  categoria: string;
  setCategoria: (val: string) => void;
  precoMin: number | "";
  setPrecoMin: (val: number | "") => void;
  precoMax: number | "";
  setPrecoMax: (val: number | "") => void;
  onClear: () => void;
}

export default function FilterModal({ 
  onClose, 
  categoria, 
  setCategoria, 
  precoMin, 
  setPrecoMin, 
  precoMax, 
  setPrecoMax, 
  onClear 
}: FilterModalProps) {
  
  const categoriasUnicas = ["todas", ...new Set(produtos.map(p => p.categoria))];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeModal} onClick={onClose}>×</button>
        
        <h2 className={styles.modalTitle}>Filtros Místicos</h2>
        
        <div className={styles.formMagico}>
          <label className={styles.label}>Categoria:</label>
          <select 
            className={styles.inputMagico} 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categoriasUnicas.map(cat => (
              <option key={cat} value={cat}>
                {cat === "todas" ? "Todas as Magias" : cat}
              </option>
            ))}
          </select>

          <label className={styles.label}>Faixa de Preço (R$):</label>
          <div className={styles.precoContainer}>
            <input 
              type="number" 
              placeholder="Mínimo" 
              className={styles.inputMagico}
              value={precoMin}
              onChange={(e) => setPrecoMin(e.target.value === "" ? "" : Number(e.target.value))}
            />
            <input 
              type="number" 
              placeholder="Máximo" 
              className={styles.inputMagico}
              value={precoMax}
              onChange={(e) => setPrecoMax(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>

          <button className={styles.applyBtn} onClick={onClose}>
            Aplicar Magia
          </button>
          
          <button className={styles.clearBtn} onClick={onClear}>
            Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}