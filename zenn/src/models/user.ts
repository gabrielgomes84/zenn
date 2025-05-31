export type Prioridade = "baixa" | "média" | "alta";
export type Status = "pendente" | "concluída";

export interface Task {
  id: string;
  usuario_id: string; // referência ao id do usuário
  titulo: string;
  descricao: string;
  data: string; // formato: "YYYY-MM-DD"
  hora: string; // formato: "HH:MM"
  prioridade: Prioridade;
  status: Status;
  lembrete: boolean;
  data_criacao: string;
}
