"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";
import { MagicAPI } from "./MagicAPI";

const CartContext = createContext<any>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const { usuario } = useAuth();
  const { addToast } = useToast();

  // Carrega o carrinho quando o usuário loga
  useEffect(() => {
    if (usuario) {
      const dados = MagicAPI.getDadosUsuario(usuario.email);
      setCarrinho(dados?.lista_compras || []);
    } else {
      setCarrinho([]);
    }
  }, [usuario]);

  const atualizarEGuardar = (novoCarrinho: any[]) => {
    setCarrinho(novoCarrinho);
    if (usuario) MagicAPI.salvarCarrinhoNoUsuario(usuario.email, novoCarrinho);
  };

  const adicionarAoCarrinho = (produto: any) => {
    if (!usuario) return addToast("Sintonize sua magia primeiro!");
    
    const existe = carrinho.find(i => i.id === produto.id);
    const novo = existe 
      ? carrinho.map(i => i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i)
      : [...carrinho, { ...produto, quantidade: 1 }];
    
    atualizarEGuardar(novo);
    addToast(`${produto.nome} adicionado!`);
  };

  const removerDoCarrinho = (id: number) => {
    atualizarEGuardar(carrinho.filter(i => i.id !== id));
    addToast("Item removido!");
  };

  const atualizarQuantidade = (id: number, mudanca: number) => {
    atualizarEGuardar(carrinho.map(i => i.id === id ? { ...i, quantidade: Math.max(1, i.quantidade + mudanca) } : i));
  };

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho: () => atualizarEGuardar([]) }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);