const Queue = require('bull');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const myFirstQueue = new Queue('my-first-queue');

myFirstQueue.add({ message: 'how are you' });
myFirstQueue.add({ foo: 'bar' }, { delay: 5000 });

myFirstQueue.process(async (job) => {
	let progress = 0;
	for (i = 0; i < 100; i++) {
		await doSomething(job.data);
		progress += 1;
		await sleep(1000);
		job.progress(progress);
		job.log(`progress is ${progress}%`);
	}
});

// this is external function
function doSomething(data) {
	console.log(data);
	return Promise.resolve();
}

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
	queues: [new BullAdapter(myFirstQueue)],
	serverAdapter: serverAdapter,
});

const commit1 = function () {
	console.log('commit1 in newbranch1');
};

const commit2 = function () {
	console.log('commit1 in newbranch2');
};

const commit3 = function () {
	console.log('commit1 in newbranch3');
};

const commit4 = function () {
	console.log('commit1 in newbranch4');
};

module.exports = { serverAdapter };
