const router = require('express').Router();
const md5 = require('md5');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const uuidv4 = require('uuid').v4();

const adapter = new FileAsync('user.json');

// Lista todos os usuários
router.get('/', (req, res) => {
  low(adapter).then((db) => {
    const user = db.get('users');

    res.send(user);
  });
});

// Retorna usuário pelo e-mail passado
router.get('/:email', (req, res) => {
  low(adapter).then((db) => {
    const user = db
      .get('users')
      .find({ email: req.params.email })
      .value();

    res.send(JSON.stringify(user));
  });
});

// Cadastra novo usuário
router.post('/', (req, res) => {
  low(adapter).then((db) => {
    const { body } = req || {};
    const { name, email, password } = body || {};
    const user = db
      .get('users')
      .find({ email })
      .value();

    if (user) {
      res.status(403).send('Já existe um usuário cadastrado com esse e-mail');
    } else if (!name || !email || !password) {
      res.status(403).send('Os dados de nome, e-mail e senha são obrigatórios');
    } else {
      const id = uuidv4;

      body.token = md5(id);

      db.get('users')
        .push(body)
        .last()
        .assign({ id })
        .write()
        .then((data) => res.send(data));
    }
  });
});

// Verifica usuário por e-mail e senha e retorna
router.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  low(adapter).then((db) => {
    if (!email || !password) {
      res.status(403).send('Os dados de e-mail e senha são obrigatórios');
    } else {
      const user = db
        .get('users')
        .find({ email, password })
        .value();
      const data = user ? JSON.stringify(user) : 'Usuário ou senha incorretos';

      res.send(data);
    }
  });
});

// Cadastra nova senha
router.post('/:id/reset', (req, res) => {
  const { password } = req.body || {};

  low(adapter).then((db) => {
    if (!password) {
      res.status(403).send('Nenhuma senha foi enviada');
    } else {
      db.get('users')
        .find({ id: req.params.id })
        .assign({ password })
        .write()
        .then((user) => res.send(user));
    }
  });
});

module.exports = router;
