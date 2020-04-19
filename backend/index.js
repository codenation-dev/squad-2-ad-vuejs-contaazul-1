const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

// Create server
const app = express();
app.use(bodyParser.json());

// Create database instance and start server
const adapter = new FileAsync('db.json');
low(adapter)
	.then((db) => {
		// Routes
		app.get('/users', (req, res) => {
			const { email, password } = req.body || {};
			let data = {
				error: {
					message: 'E-mail e Senha precisam ser preenchidos',
				},
			};

			// password = md5(password);

			if (email && password) {
				data = db.get('users').find({ email, password }).value();

				delete data.password;
			}

			res.send(data);
		});

		app.get('/users/all', (req, res) => {
			const user = db.get('users');

			res.send(user);
		});

		// GET /users/:id
		app.get('/users/:id', (req, res) => {
			const user = db.get('users').find({ id: req.params.id }).value();

			res.send(JSON.stringify(user));
		});

		// POST /users
		app.post('/users', (req, res) => {
			const id = Date.now().toString();

			// req.body.password = md5(req.body.password);
			req.body.token = md5(id);

			db.get('users')
				.push(req.body)
				.last()
				.assign({ id })
				.write()
				.then((user) => res.send(user));
		});

		// Set db default values
		return db.defaults({ users: [], posts: [] }).write();
	})
	.then(() => {
		app.listen(3000, () => console.log('API listening on port 3000'));
	});
