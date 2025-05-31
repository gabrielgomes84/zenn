### Entidade: Usuário
- id (string ou UUID)
- nome (string)
- email (string)
- senha (string)
- data_criacao (datetime)

### Entidade: Tarefa
- id (string ou UUID)
- usuario_id (referência ao Usuário)
- titulo (string)
- descricao (string)
- data (date)
- hora (time)
- prioridade (baixa, média, alta)
- status (pendente, concluída)
- lembrete (boolean)
- data_criacao (datetime)
