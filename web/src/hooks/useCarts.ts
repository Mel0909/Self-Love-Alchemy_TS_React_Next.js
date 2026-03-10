"use client";
import { useState, useEffect } from "react";
import { ItemCarrinho, Produto } from "../types";

export function useCart() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  useEffect(() => {
    const emailLogado = localStorage.getItem("email_bruxinha");
    if (emailLogado) {
      const listaBruxas = JSON.parse(localStorage.getItem("grimorio_usuarios") || "[]");
      const bruxa = listaBruxas.find((b: any) => b.email === emailLogado);
      if (bruxa && bruxa.lista_compras) {
        setCarrinho(bruxa.lista_compras);
      }
    }
  }, []);

  const adicionarAoCaldeirao = (produto: Produto) => {
    const emailLogado = localStorage.getItem("email_bruxinha");
    if (!emailLogado) {
      alert("Sintonize sua magia primeiro! (Faça login)");
      return;
    }

    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.id === produto.id);
      const novoCarrinho = itemExistente
        ? prev.map((item) => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item)
        : [...prev, { ...produto, quantidade: 1 }];

      atualizarLocalStorage(emailLogado, novoCarrinho);
      return novoCarrinho;
    });
  };

  const removerDoCaldeirao = (id: number) => {
    const emailLogado = localStorage.getItem("email_bruxinha");
    if (!emailLogado) return;

    setCarrinho((prev) => {
      const novoCarrinho = prev.filter((item) => item.id !== id);
      atualizarLocalStorage(emailLogado, novoCarrinho);
      return novoCarrinho;
    });
  };

  const atualizarLocalStorage = (email: string, novoCarrinho: ItemCarrinho[]) => {
    let listaBruxas = JSON.parse(localStorage.getItem("grimorio_usuarios") || "[]");
    const index = listaBruxas.findIndex((b: any) => b.email === email);
    if (index !== -1) {
      listaBruxas[index].lista_compras = novoCarrinho;
      localStorage.setItem("grimorio_usuarios", JSON.stringify(listaBruxas));
    }
  };

  const quantidadeTotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return { carrinho, adicionarAoCaldeirao, removerDoCaldeirao, quantidadeTotal };
}