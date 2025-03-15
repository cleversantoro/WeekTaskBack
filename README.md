# WeekTasksBack

## Descrição do Projeto
WeekTasksBack é um serviço backend para gerenciar tarefas semanais. Ele fornece APIs para criar, ler, atualizar e excluir tarefas, bem como para gerenciar autenticação e autorização de usuários.

## Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seuusuario/WeekTasksBack.git
    ```

2. Navegue até o diretório do projeto:
    ```sh
    cd WeekTasksBack
    ```

3. Instale as dependências:
    ```sh
    npm install
    ```

## Uso

1. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```

2. O servidor estará rodando em `http://localhost:3000`.

3. Use um cliente de API como o Postman para interagir com os endpoints.

## Endpoints da API

- `GET /tasks` - Recuperar todas as tarefas
- `POST /tasks` - Criar uma nova tarefa
- `GET /tasks/:id` - Recuperar uma tarefa específica
- `PUT /tasks/:id` - Atualizar uma tarefa específica
- `DELETE /tasks/:id` - Excluir uma tarefa específica

## Contribuindo

1. Faça um fork do repositório.
2. Crie um novo branch (`git checkout -b feature-branch`).
3. Faça suas alterações.
4. Commite suas alterações (`git commit -m 'Adicionar algum recurso'`).
5. Faça o push para o branch (`git push origin feature-branch`).
6. Abra um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT.
