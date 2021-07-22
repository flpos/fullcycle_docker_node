const express = require('express');
const mysql = require('mysql');
const app = express();

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const setupDb = async () => {
  const connection = mysql.createConnection(config);
  const sql = `select * from people`;

  return new Promise((resolve, reject) => {
    connection
      .query(sql)
      .on('end', () => {
        connection.end();
        resolve();
      })
      .on('error', (err) => {
        if (err.code === 'ER_NO_SUCH_TABLE') {
          const createTableSql = `
        create table people (
          id int(6) unsigned auto_increment primary key,
          name varchar(30) not null);
          `;
          connection.query(createTableSql);
        } else {
          connection.end();
          reject(err);
        }
      });
  });
};

const names = [
  'Felipe',
  'Beatriz',
  'Victor',
  'Amanda',
  'Wesley',
  'Bianca',
  'Italo',
  'Igor',
];
const getRandomName = () => {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
};

app.get('/', async (_, res) => {
  const connection = mysql.createConnection(config);
  const insertSql = `INSERT INTO people(name) values('${getRandomName()}')`;
  const sql = `select * from people`;

  await new Promise((resolve, reject) => {
    connection.query(insertSql).on('end', resolve).on('error', reject);
  });

  const people = await new Promise((resolve, reject) => {
    const result = [];
    connection
      .query(sql)
      .on('result', (row) => {
        result.push(row);
      })
      .on('end', () => {
        connection.end();
        resolve(result);
      })
      .on('error', reject);
  });

  return res.send(
    `<h1>Full Cycle Rocks!</h1>
      </br>
      <p>
        ${people.map((r) => r.name).join(', ')}
      </p>`
  );
});

setupDb().then(() => {
  app.listen(3000, () => console.log('Servidor ouvindo na porta 3000'));
});
