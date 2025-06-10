export interface Categoria {
  id: string;
  nome: string;
}

export interface Tarefa {
  id: string;
  titulo: string;
  finalizado: boolean;
  categoria: Categoria;
  data: string; // formato ISO ou 'yyyy-MM-dd'
  hora: string; // formato 'HH:mm' ou similar
}

export interface TarefaUpdate {
  titulo: string;
  data: string; // formato ISO ou 'yyyy-MM-dd'
  hora: string; // formato 'HH:mm' ou similar
  finalizado: boolean;
  categoria_id: string;
}

class CategoriaNull implements Categoria {
  id = '';
  nome = '';
}

class TarefaNull implements Tarefa {
  id = '';
  titulo = '';
  finalizado = false;
  categoria = new CategoriaNull();
  data = '';
  hora = '';
}

export const TAREFA_NULL = Object.freeze(new TarefaNull());
export const CATEGORIA_NULL = Object.freeze(new CategoriaNull());