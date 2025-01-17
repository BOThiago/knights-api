# Knights API

Bem-vindo ao Knights API! Este projeto é uma API construída com NestJS para gerenciar cavaleiros.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (se for rodar sem Docker)

## Como Rodar com Docker

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/knights-api.git
   cd knights-api
   ```

2. **Configure as variáveis de ambiente:**
   Certifique-se de que o arquivo `.env` está configurado corretamente.

3. **Inicie os serviços:**

   ```bash
   docker-compose up -d
   ```

4. **Acesse a API:**
   A API estará rodando em [http://localhost:3000](http://localhost:3000)

5. **Acesse o Swagger:**
   Vá para [http://localhost:3000/api](http://localhost:3000/api) para visualizar a documentação interativa da API.

## Como Rodar sem Docker

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/knights-api.git
   cd knights-api
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Edite o arquivo `.env` com suas configurações.

4. **Inicie a API:**

   ```bash
   npm run build
   npm start
   ```

5. **Acesse a API:**
   A API estará rodando em [http://localhost:3000](http://localhost:3000)

6. **Acesse o Swagger:**
   Vá para [http://localhost:3000/api](http://localhost:3000/api) para visualizar a documentação interativa da API.

## Endpoints Disponíveis

- `GET /knights` - Listar cavaleiros
- `GET /knights/hall-of-heroes` - Listar heróis
- `GET /knights/:id` - Obter detalhes de um cavaleiro
- `POST /knights` - Criar um novo cavaleiro
- `PATCH /knights/:id` - Atualizar apelido de um cavaleiro
- `DELETE /knights/:id` - Remover um cavaleiro

## Contribuição

Sinta-se à vontade para contribuir! Abra issues e pull requests conforme necessário.

## Licença

Este projeto está licenciado sob a licença MIT.
