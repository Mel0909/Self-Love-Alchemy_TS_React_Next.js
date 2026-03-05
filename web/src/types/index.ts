import type { Role } from '@/generated/prisma';

export type AllowedRoutes = { 
  GET?: Role[]
  POST?: Role[]
  PATCH?: Role[]
  DELETE?: Role[]
}

export interface Produto {
  id: number;
  nome: string;
  desc: string;
  preco: string;
  imagem: string;
  categoria: string;
}

export interface ItemCarrinho extends Produto {
  quantidade: number;
}

export interface Usuario {
  nome: string;
  email: string;
}