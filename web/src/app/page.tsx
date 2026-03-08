"use client";
import Header from "./(frontend)/components/header/Header";
import Hero from "./(frontend)/components/banner/Hero";
import SearchBox from "./(frontend)/components/search/SearchBox";

export default function Home() {
  return (
    <main>
      <Header 
        onOpenCart={() => console.log("Abrir Carrinho")} 
        onOpenLogin={() => console.log("Abrir Login")} 
      />
      <Hero />
      <SearchBox />
    </main>
  );
}