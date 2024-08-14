## User Auth - Nestjs Graphql

Este projeto é um exemplo de como pode funcionar uma api utilizando[Nestjs](https://github.com/nestjs/nest) e [Graphql](https://graphql.org/). Para melhor experiência de funcionamento ou consumo dela, consultar meu outro repositório front-end que consome [essa api](https://github.com/Colherinhas/Angular-Graphql-Userlogin-Consumer). Este repositório possui um sistema completo de login, CRUD de usuários e também alguns endpoints adicionais de teste para relação de outras tabelas com os usuários, como o de criação de repositórios ou de redes sociais (funcionando como um linktree).

## Instalação e execução

• Para executar este código, no mínimo será necessário ter em seu computador o [Node Package Manager](https://www.npmjs.com/) e o [Git](https://git-scm.com/) para clonar o repositório para seu diretório local.
• Primeiramente, é necessário a configuração do arquivo `.env`, que está disponibilizado como `.env-example` no código, colocando seu database para ser utilizado. Originalmente, criei o projeto utilizando o postgres, e portanto para redução de riscos recomendo utilizar o mesmo. Após colocar suas devidas variáveis pessoais na `.env-example`, por favor, modifique o nome do arquivo para apenas `.env`. Vale repetir para que compartilhe suas informações colocadas neste arquivo, e que em todas versões do código pode ser que ele não esteja contido.
• O código pode ser rodado com banco utilizando o docker, para isso, pode ser que seja necessária a configuração manual do arquivo `docker-compose.yaml` e com o comando `docker compose up -d`, com a versão do [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalada e atualizada para acima da versão 3.0 para leitura das variáveis da `.env`;
• Finalmente, inicializando sua instalação correta, basta ligar o script de instalação e execução:

```bash
$ npm run main
```

Este script de comandos pode ser lido na seção `"scripts"` do arquivo `package.json`.
Inicialmente, ele criará um diretório dist, que contém o bundle js do próprio projeto. O output do console deve conter em sua última linha algo como:

```bash
"[Nest] 9640  - 14/08/2024, 00:17:01     LOG [NestApplication] Nest application successfully started +5ms"
```

Neste caso, o código está sendo executado corretamente e já pode ser utilizado. Caso contrário, procure pela seção "Debug Cases" (deste mesmo arquivo). Erros em requisições para além da seção de debug costumarão ser por problemas externos locais que não foram previstos.

• Após a primeira inicialização, o código poderá ser executado com o comando direto `nest start` ou `npm start`.

## Consultando requisições e bancos de dados

O código permite acessar e testar requisições com o [Playground do graphql](https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground/) que pode ser acessado (durante a execução da api) localmente em seu navegador com a url `http://localhost:3000/graphql`. Também se é disponibilizado (durate a execução da api) o [ambiente de estúdio do Prisma](https://www.prisma.io/studio) que conterá tudo aquilo que está salvo em seu banco de dados, que pode ser consultado após digitar o comando (em outro prompt além do da api):

```bash
$ npx prisma studio
```

## Informações sobre a estrutura do projeto a nível de código

• O código foi feito e moldado utilizando as seguintes tecnologias e ferramentas: Nestjs, ApolloServer, GraphQL, token Jwt, Prisma, banco Postgres(Opcional, mas obrigatório ser relacional [SQL]) .
• É necessária a configuração da `.env` e opcionalmente do `docker-compose.yaml` e execução com `docker compose up -d`.
• A estrutura do código utiliza a modularização do nestjs, em estrutura MVC, com resolvers, use cases e arquivos de conexão de repository.
• Há validação de dados em entrada com dto's e saída com models de resposta (comumente também encontrados como entities), com o esquema do banco de dados sendo definidos pelo arquivo `schema.prisma`. Normalmente, para modificar endpoints, haverá apenas que modifique esses arquivos. \*obs, não se esqueça de executar `npx prisma migrate dev` e prisma generate quando houver mudanças à nivel estrutural do banco de dados, para ter as relações corretas entre as entidades do prisma e os dtos/models.
• Para comparação dos models e dtos, pode-se ver nos use cases problemas dados pelo typescript se o repository aceita ou não aquele dto ou model.
• Há um módulo shared, que pode ser utilizado para o compartilhamento de providers entre módulos, ele está sendo importado por todos os módulos, e seus providers internos poderão ser reutilizados e injetados por toda a api.
• O código aceita seeders pelo prisma, que podem ser encontrados no diretório `/prisma/seeds` e que podem ser separadamente criados, injetados no arquivo `seed.ts` e corretamente colocados à disposição no banco de dados com o comando `$ npx prisma db seed`.

## Debug Cases

Caso hajam problemas, deve-se primeiramente localizar o problema.
• Primeiramente utilize o comando disponibilizado com script `$ npm run main` .
• Verifique se sua `.env` foi configurada corretamente. Lembre-se de modificar o nome do arquivo `.env-example` para `.env`.
• Na utilização do docker, verifique se seu docker está atualizado para uma versão acima da 3, e se o `docker compose up -d` foi corretamente moldada pelas variáveis da `.env`, caso contrário pode-se fazer necessário hardcode das variáveis no `docker-compose.yaml`.
• Verifique se os comandos `$ npm install` tiveram sucesso sem erros na execução. Esporadicamente, o código pode não instalar corretamente o @nestjs/config, portanto recomenda-se que o instale manualmente caso não queira recorrer ao script disponibilizado `$ npm run main`.
• Com a api completamente desligada, verifique a execução dos comandos do prisma, como `$ npx prisma migrate dev --name "nome"`, `$ npx prisma generate`, `$ npx prisma db seed`.
• Pode haver algum erro recorrente da existência das migrations no projeto, portanto, se necessário, tente excluir o diretório `/prisma/migrations` e rodar novamente os comandos do prisma descritos acima.
• Se houver algum erro de instalação, podemos utilizar o comando (COM CAUTELA) `$ npm cache clean --force` e depois `$ npm run main` novamente.
