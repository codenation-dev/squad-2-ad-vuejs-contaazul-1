const router = require('express').Router();
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('error.json');

// Lista todos os erros
router.get('/', (req, res) => {
  low(adapter).then(db => {
    const error = db.get('errors');

    res.send(error);
  });
});

// Retorna erro pelo id passado
router.get('/:id', (req, res) => {
  low(adapter).then(db => {
    const error = db.get('errors').find({id: req.params.id}).value();
    if (!error) {
      res.status(404).send('Erro não existe!');
    };
    res.send(JSON.stringify(error));
  });
});

// Deletar erro
router.delete('/:id', (req, res) => {
  low(adapter).then(db => {
    const error = db.get('errors').find({id: req.params.id}).value();
    if (!error) {
      res.status(404).send('Erro não existe!');
    };

    db.get('errors').remove({ id: req.params.id }).write()
      .then(() => res.send(JSON.stringify(true)))
      .catch(() => res.status(404).send('Erro ao deletar erro!'));

  });
});

// Arquivar erro
router.put('/:id/archive', (req, res) => {
  low(adapter).then(db => {
    const error = db.get('errors').find({id: req.params.id}).value();
    if (!error) {
      res.status(404).send('Erro não existe!');
    };
    db.get('errors').find({ id: req.params.id })
      .assign({ archive: true }).write()
      .then((error) => res.send(error))
      .catch(() => res.status(404).send('Erro ao arquivar erro!'));
  });
});

module.exports = router;
