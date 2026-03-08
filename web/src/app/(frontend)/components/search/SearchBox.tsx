"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import styles from "./SearchBox.module.css";

export default function SearchBox() {
  const [busca, setBusca] = useState("");

  return (
    <section className={styles.searchFilterContainer}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Procurar magia..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <span className={styles.searchIcon}>
          <Search size={22} color="var(--mystic-pink)" />
        </span>
      </div>

      <button 
        className={styles.filterBtn} 
        onClick={() => console.log("Abrindo filtros misticos...")}
      >
        <SlidersHorizontal size={28} color="var(--mystic-gold)" />
      </button>
    </section>
  );
}