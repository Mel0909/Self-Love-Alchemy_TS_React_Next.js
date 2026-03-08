"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Tipos básicos para não dar erro
interface MagicContextType {
  usuario: { nome: string } | null;
  carrinho: any[];
}

const MagicContext = createContext<MagicContextType | undefined>(undefined);

export function MagicProvider({ children }: { children: ReactNode }) {
  const [usuario] = useState({ nome: "Mel" }); // User fictício para teste
  const [carrinho] = useState([]);

  return (
    <MagicContext.Provider value={{ usuario, carrinho }}>
      {children}
    </MagicContext.Provider>
  );
}

export const useMagic = () => {
  const context = useContext(MagicContext);
  if (!context) throw new Error("useMagic deve ser usado dentro de um MagicProvider");
  return context;
};