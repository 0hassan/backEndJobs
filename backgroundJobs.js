const Queue = require("bull");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const hblQueue = new Queue("hbl", {
  redis: { port: 6379, host: "127.0.0.1", password: "foobared" },
});
const burgerQueue = new Queue("burger");

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(hblQueue), new BullAdapter(burgerQueue)],
  serverAdapter: serverAdapter,
});

module.exports = { serverAdapter };
