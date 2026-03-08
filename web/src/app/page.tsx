"use client";
import { useState } from "react";
import Header from "./(frontend)/components/header/Header";
import Hero from "./(frontend)/components/banner/Hero";
import SearchBox from "./(frontend)/components/search/SearchBox";
import ProductList from "./(frontend)/components/product/ProductList";

export default function Home() {
  const [termoBusca, setTermoBusca] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [precoMin, setPrecoMin] = useState<number | "">("");
  const [precoMax, setPrecoMax] = useState<number | "">("");

  const limparFiltros = () => {
    setCategoria("todas");
    setPrecoMin("");
    setPrecoMax("");
    setTermoBusca("");
  };

  return (
    <main>
      <Header 
        onOpenCart={() => console.log("Carrinho")} 
        onOpenLogin={() => console.log("Login")} 
      />
      <Hero />
      <SearchBox 
        termo={termoBusca} setTermo={setTermoBusca}
        categoria={categoria} setCategoria={setCategoria}
        precoMin={precoMin} setPrecoMin={setPrecoMin}
        precoMax={precoMax} setPrecoMax={setPrecoMax}
        onClear={limparFiltros}
      />
      <ProductList 
        filtro={termoBusca} 
        categoria={categoria}
        min={precoMin}
        max={precoMax}
      />
    </main>
  );
}