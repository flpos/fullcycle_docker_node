const express = require('express');

const app = express();

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const createTableSql = `
    create table people (
      id int(6) unsigned auto_increment primary key,
      name varchar(30) not null);
  `;

connection.query(createTableSql).on('error', (err) => {
  if (err.code === 'ER_TABLE_EXISTS_ERROR') {
    console.log('Tabela ja existe');
  } else {
    console.error(err);
  }
});

const sql = `INSERT INTO people(name) values('Wesley')`;
connection.query(sql);
connection.end();

app.get('/', (_, res) => {
  const result = [];

  const connection = mysql.createConnection(config);
  const sql = `select * from people`;

  connection
    .query(sql)
    .on('result', (row) => {
      result.push(row);
    })
    .on('end', () => {
      connection.end();
      return res.send(
        `<h1>Full Cycle Rocks!</h1>
        </br>
        <p>
          ${result.map((r) => r.name).join(', ')}
        </p>`
      );
    });
});

app.listen(3000, () => console.log('Servidor ouvindo na porta 3000'));
