# Bem-vindo ao LiteraLink!
O LiteraLink nasceu como resposta ao desafio **Descomplica** - desafio do ciclo 2 da turma **Hopper** do Alpha Edtech.

Aqui, você encontrará o código-fonte e os detalhes desse projeto que se tornou uma plataforma para incentivar a leitura por meio de metas e comunidades. Sinta-se à vontade para explorar e contribuir.

## Contribuidores

 - Anderson Lima - Frontend
 - Arthur Mancio - Infraestrutura e Frontend
 - Eduardo Henrique - Backend
 - Henrique Seiti - Backend

## Tecnologias Utilizadas

 - Framework
	 - Next js 13
 - Desenvolvimento
	 - React
	 - Tailwind css
	 - Node js
	 - Typescript
	 - Websocket
	 - Git/Github
	 - Jest
 - Infraestrutura
	 - Mongo DB
	 - Redis
	 - Docker

## Rodando o projeto localmente

Graças ao uso do docker, rodar o projeto localmente é muito simples. Basta ter o docker instalado, e rodar o seguinte comando:

 - Ambiente de desenvolvimento

    npm install
    npx next-ws-cli patch -y
    docker compose -f ./docker-compose.dev.yml up -d --build

 - Ambiente de testes
 

     docker compose -f ./docker-compose.test.yml up -d --build

 - Ambiente de produção
 

     docker compose -f ./docker-compose.prod.yml up -d --build

*Lembre-se de preencher o dotenv devidamente*