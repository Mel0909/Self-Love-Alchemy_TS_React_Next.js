"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "./ToastContext";

interface Usuario {
  nome: string;
  email: string;
  lista_compras?: any[];
}

interface MagicContextType {
  usuario: Usuario | null;
  carrinho: any[];
  cadastrar: (nome: string, email: string, senha: string) => boolean;
  entrar: (email: string, senha: string) => boolean;
  deslogar: () => void;
  adicionarAoCarrinho: (produto: any) => void;
  removerDoCarrinho: (id: number) => void;
  atualizarQuantidade: (id: number, mudanca: number) => void;
  limparCarrinho: () => void;
}

const MagicContext = createContext<MagicContextType | undefined>(undefined);

export function MagicProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const emailLogado = localStorage.getItem("email_bruxinha");
    if (emailLogado) {
      const lista = JSON.parse(localStorage.getItem("grimorio_usuarios") || "[]");
      const dadosUser = lista.find((u: Usuario) => u.email === emailLogado);
      if (dadosUser) {
        setUsuario({ nome: dadosUser.nome, email: dadosUser.email });
        setCarrinho(dadosUser.lista_compras || []);
      }
    }
  }, []);

  const persistirNoGrimorio = (novoCarrinho: any[]) => {
    if (!usuario) return;

    const listaGeral = JSON.parse(localStorage.getItem("grimorio_usuarios") || "[]");
    const novaListaGeral = listaGeral.map((u: any) => {
      if (u.email === usuario.email) {
        return { ...u, lista_compras: novoCarrinho };
      }
      return u;
    });

    localStorage.setItem("grimorio_usuarios", JSON.stringify(novaListaGeral));
    setCarrinho(novoCarrinho);
  };

  const cadastrar = (nome: string, email: string, senha: string) => {
    const lista = JSON.parse(localStorage.getItem("grimorio_usuarios") || "[]");
    if (lista.some((u: any) => u.email === email)) {
      addToast("Este correio mágico já está registrado!");
      return false;
    }

    const novoU = { nome, email, senha, lista_compras: [] };
    lista.push(novoU);
    localStorage.setItem("grimorio_usuarios", JSON.stringify(lista));
    
    setUsuario({ nome, email });
    setCarrinho([]);
    localStorage.setItem("email_bruxinha", email);
    localStorage.setItem("nome_bruxinha", nome);
    return true;
  };

  const entrar = (email: string, senha: string) => {
    const lista = JSON.parse(localStorage.getItem("grimorio_usuarios") || "[]");
    const user = lista.find((u: any) => u.email === email && u.senha === senha);

    if (user) {
      setUsuario({ nome: user.nome, email: user.email });
      setCarrinho(user.lista_compras || []);
      localStorage.setItem("email_bruxinha", user.email);
      localStorage.setItem("nome_bruxinha", user.nome);
      return true;
    }
    addToast("Dados incorretos no grimório!");
    return false;
  };

  const deslogar = () => {
    setUsuario(null);
    setCarrinho([]);
    localStorage.removeItem("email_bruxinha");
    localStorage.removeItem("nome_bruxinha");
  };

  const adicionarAoCarrinho = (produto: any) => {
    if (!usuario) {
      addToast("Sintonize sua magia primeiro!");
      return;
    }

    const existe = carrinho.find((i) => i.id === produto.id);
    let novo;

    if (existe) {
      novo = carrinho.map((i) => 
        i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
      );
    } else {
      novo = [...carrinho, { ...produto, quantidade: 1 }];
    }

    persistirNoGrimorio(novo);
    addToast(`${produto.nome} adicionado! ✨`);
  };

  const removerDoCarrinho = (id: number) => {
    const novo = carrinho.filter((i) => i.id !== id);
    persistirNoGrimorio(novo);
    addToast("Item removido do caldeirão!");
  };

  const atualizarQuantidade = (id: number, mudanca: number) => {
    const novo = carrinho.map((i) => {
      if (i.id === id) {
        const n = i.quantidade + mudanca;
        return n >= 1 ? { ...i, quantidade: n } : i;
      }
      return i;
    });
    persistirNoGrimorio(novo);
  };

  const limparCarrinho = () => {
    persistirNoGrimorio([]);
  };

  return (
    <MagicContext.Provider value={{ 
      usuario, carrinho, cadastrar, entrar, deslogar, 
      adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho 
    }}>
      {children}
    </MagicContext.Provider>
  );
}

export const useMagic = () => {
  const context = useContext(MagicContext);
  if (!context) throw new Error("useMagic deve ser usado dentro de um MagicProvider");
  return context;
};