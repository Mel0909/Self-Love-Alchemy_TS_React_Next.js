"use client";
import { useState } from "react";
import { produtos } from "@/data/produtos";
import ProductCard from "./ProductCard";
import ProductZoom from "./ProductZoom";
import styles from "./ProductList.module.css";

export default function ProductList({ filtro, categoria, min, max }: any) {
  const [produtoEmZoom, setProdutoEmZoom] = useState<any>(null);

  const produtosFiltrados = produtos.filter((p) => {
    const nomeOk = p.nome.toLowerCase().includes(filtro.toLowerCase());
    const categoriaOk = categoria === "todas" || p.categoria === categoria;
    const precoNum = parseFloat(p.preco.replace(",", "."));
    const precoMinOk = min === "" || precoNum >= min;
    const precoMaxOk = max === "" || precoNum <= max;
    return nomeOk && categoriaOk && precoMinOk && precoMaxOk;
  });

  return (
    <section className={styles.vitrineContainer}>
      <div className={styles.productGrid}>
        {produtosFiltrados.map((item) => (
          <ProductCard 
            key={item.id} 
            produto={item} 
            onOpenZoom={() => setProdutoEmZoom(item)} 
          />
        ))}
      </div>

      {/* Modal de Detalhes (Zoom) */}
      {produtoEmZoom && (
        <ProductZoom 
          produto={produtoEmZoom} 
          onClose={() => setProdutoEmZoom(null)} 
        />
      )}
    </section>
  );
}