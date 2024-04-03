const express = require('express');
const { serverAdapter } = require('./backgroundJobs');

const app = express();

app.use('/admin/queues', serverAdapter.getRouter());

// other configurations of your server

app.listen(3000, () => {
	console.log('Running on 3000...');
	console.log('For the UI, open http://localhost:3000/admin/queues');
	console.log('Make sure Redis is running on port 6379 by default');
});
