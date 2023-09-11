# Tweteroo - Clone do Twitter

Este é um projeto de backend que consiste em construir a API do Tweteroo, um clone do Twitter. Ele oferece recursos para criar e visualizar tweets, fazer login e realizar operações relacionadas a usuários.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) - Um framework para construção de aplicativos Node.js.
- [Git](https://git-scm.com/) - Versionamento de código.
- [GitHub](https://github.com/) - Repositório público do GitHub para o código do backend.
- [Jest](https://jestjs.io/) - Framework de teste.
- [Postman](https://www.postman.com/) - Ferramenta para testes de API.
- [npm](https://www.npmjs.com/) - Gerenciador de pacotes JavaScript.
- [Visual Studio Code](https://code.visualstudio.com/) - Editor de código.

## Funcionalidades

- **Cadastro de Usuário**: Rota `POST /sign-up` para cadastrar um usuário com nome de usuário e avatar.

- **Criação de Tweets**: Rota `POST /tweets` para criar tweets associados a um usuário.

- **Listagem de Tweets**: Rota `GET /tweets` para listar os 15 últimos tweets publicados. Suporta paginação via query string `?page=1`.

- **Listagem de Tweets por Usuário**: Rota `GET /tweets/:username` para listar todos os tweets de um usuário específico.

## Pré-requisitos

Certifique-se de ter instalado o Node.js e o NestJS em sua máquina. Além disso, você precisa configurar um banco de dados (variáveis globais em memória) para armazenar os usuários e tweets.

## Instalação

1. Clone este repositório: `git clone https://github.com/seu-usuario/tweteroo-backend.git`
2. Acesse a pasta do projeto: `cd tweteroo-backend`
3. Instale as dependências: `npm install`

## Configuração do Banco de Dados

Para armazenar os dados dos usuários e tweets, configure variáveis globais em memória na camada de serviço. Certifique-se de seguir as especificações do projeto.

## Uso

Execute o servidor NestJS com o seguinte comando:

```bash
npm run start

O servidor estará disponível em http://localhost:3000 (porta padrão do NestJS).

## Testes de Integração
Certifique-se de que todos os testes de integração passam antes de implantar seu aplicativo. Substitua o conteúdo da pasta test/ pelo fornecido e execute os testes com o seguinte comando:

```bash
npm run test:e2e

## Contribuição
Sinta-se à vontade para contribuir com melhorias para este projeto. Crie um fork do repositório, faça suas alterações e envie uma solicitação de pull.

## Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo LICENSE para obter detalhes.

