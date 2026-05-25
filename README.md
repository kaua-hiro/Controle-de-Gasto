# Aplicativo Controle de Gastos

Aplicativo mobile desenvolvido em React Native para gestão e controle financeiro pessoal. O sistema realiza o cadastro, listagem e armazenamento em banco de dados local, operando com uma arquitetura de interface multiplataforma.

## Funcionalidades

* Cadastro de despesas com validação de campos obrigatórios e sanitização numérica.
* Listagem em ordem cronológica reversa (mais recentes primeiro).
* Dashboard financeiro com cálculo dinâmico do somatório total de gastos.
* Sistema híbrido de calendário (Date Picker nativo para Mobile e input mascarado para Web).
* Formatação monetária em tempo real (BRL).
* Armazenamento de dados persistente e isolamento de ambiente para testes Web.

## Stack Tecnológico

* React Native (Framework UI)
* Expo (Toolchain)
* Expo SQLite (Persistência de Dados)
* React Navigation (Roteamento Stack)
* StyleSheet (Estilização Nativa Multiplataforma)

## Como Executar o Projeto

Certifique-se de ter o ambiente Node.js configurado. Siga as instruções abaixo no terminal:

1. Clone ou baixe o repositório.
2. Acesse a pasta do projeto e instale as dependências:

    npm install

3. Inicie o servidor do Expo Bundler:

    npx expo start

4. Para rodar a aplicação em emulador Web (com mock em memória do SQLite), utilize a flag e limpe o cache:

    npx expo start -c --web

## Estrutura Arquitetural

O código fonte segue uma organização por separação de responsabilidades (Clean Architecture):

    /src
      /components    - Renderização visual encapsulada (ExpenseItem)
      /database      - Lógica de persistência, DDL e DML (database)
      /navigation    - Gerenciamento de rotas e Stack (routes)
      /screens       - Telas principais (HomeScreen, AddExpenseScreen)
      /styles        - Centralização de design pattern (styles)
