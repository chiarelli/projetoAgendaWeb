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