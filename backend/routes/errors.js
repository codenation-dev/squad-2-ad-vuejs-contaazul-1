const router = require('express').Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('error.json');

// Lista todos os erros
router.get('/', (req, res) => {
  const { query } = req || {};
  const orderby = query.orderby || 'last_date';
  const order = query.order || 'desc';
  const filter = { archived: false };

  if (query.environment) {
    filter.environment = query.environment;
  }

  if (query.field) {
    filter[req.query.field] = query.searchValue;
  }

  low(adapter).then((db) => {
    const error = db
      .get('errors')
      .filter(filter)
      .orderBy(orderby, order)
      .take(10)
      .value();

    res.send(error);
  });
});

// Retorna erro pelo id passado
router.get('/:id', (req, res) => {
  low(adapter).then((db) => {
    const error = db
      .get('errors')
      .find({ id: req.params.id })
      .value();
    if (!error) {
      res.status(404).send('Erro não existe!');
    }
    res.send(JSON.stringify(error));
  });
});

// Deletar erro
router.delete('/', (req, res) => {
  const { ids } = req.body || {};

  low(adapter).then((db) => {
    const promises = ids.map((id) => {
      const collection = 'errors';

      return db
        .get(collection)
        .remove({ id })
        .write();
    });

    return Promise.all(promises)
      .then(() => res.send(JSON.stringify(true)))
      .catch(() => res.status(404).send('Erro ao excluir erro!'));
  });
});

// Arquivar erro
router.put('/archive', (req, res) => {
  const { ids } = req.body || {};
  const status = { archived: true };

  low(adapter).then((db) => {
    const promises = ids.map((id) => {
      const collection = 'errors';

      return db
        .get(collection)
        .find({ id })
        .assign(status)
        .write();
    });

    return Promise.all(promises)
      .then((data) => res.send(data))
      .catch(() => res.status(404).send('Erro ao arquivar erro!'));
  });
});

module.exports = router;
