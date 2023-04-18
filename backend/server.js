const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');

let server;

const DB_URI = `${config.mongoose.url}`;

mongoose
	.connect(`${DB_URI}`, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to DB at', DB_URI))
	.catch((err) => console.log('Failed to connect to DB', err));

app.listen(config.port, (err) => {
	if (err) console.error(err);
	console.log(`Server is up ⚡ and running at ${config.port}`);
});
