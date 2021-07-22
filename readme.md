# Curso FullCycle

## Módulo docker

### Exercício dois

A intenção do desafio era montar uma estrutura utilizando docker-compose em que pudéssimos subir, de uma só vez, três containers.

Um deles seria o banco de dados MySQL.

O segundo é uma aplicação nodejs, que se conecta ao banco de dados. Ela só tem uma rota, raiz, que insere um nome aleatório (de acordo com os nomes definidos no código) no banco e devolve "Full Cycle Rocks!" e a lista de nomes cadastrados no banco.

O terceiro container é uma imagem do nginx, rodando na porta 8080, fazendo proxy para a aplicação nodejs, rodando na porta 3000 do container 'app'.

Todos os containers podem ser iniciados com o docker-compose, rodando `docker-compose up -d` na pasta raiz do projeto
