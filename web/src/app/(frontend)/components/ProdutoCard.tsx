"use client";
import { Produto } from "../../../types";

interface ProdutoCardProps {
  produto: Produto;
  onAddCart: (produto: Produto) => void;
  onOpenZoom: (id: number) => void;
}

export default function ProdutoCard({ produto, onAddCart, onOpenZoom }: ProdutoCardProps) {
  return (
    <article className="product-card">
      <div className="product-image" onClick={() => onOpenZoom(produto.id)}>
        <img src={produto.imagem} alt={produto.nome} />
      </div>
      <div className="product-info">
        <span className="category-tag">{produto.categoria}</span>
        <h3>{produto.nome}</h3>
        <p className="price">R$ {produto.preco}</p>
        <div className="card-buttons">
          <button className="view-btn" onClick={() => onOpenZoom(produto.id)}>
            Ver Detalhes
          </button>
          <button className="add-to-cart-btn" onClick={() => onAddCart(produto)}>
            <span>Adicionar ao Caldeirão</span>
          </button>
        </div>
      </div>
    </article>
  );
}