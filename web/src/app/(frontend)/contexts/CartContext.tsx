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
    setCarrinho((prev) => {
      const novoCarrinho = prev.map((item) => {
        if (item.id === id) {
          const novaQtd = Math.max(1, item.quantidade + mudanca);
          return { ...item, quantidade: novaQtd };
        }
        return item;
      });
      
      if (usuario) {
        MagicAPI.salvarCarrinhoNoUsuario(usuario.email, novoCarrinho);
      }
      
      return novoCarrinho;
    });
  };

  return (
    <CartContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho: () => atualizarEGuardar([]) }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);