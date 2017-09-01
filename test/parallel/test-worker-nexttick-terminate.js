// Flags: --experimental-worker
'use strict';
const common = require('../common');
const { Worker } = require('worker');

// Checks that terminating in the middle of `process.nextTick()` does not
// Crash the process.

const w = new Worker(`
require('worker').parentPort.postMessage('0');
process.nextTick(() => {
  while(1);
});
`, { eval: true });

w.on('message', common.mustCall(() => {
  setTimeout(() => {
    w.terminate(common.mustCall());
  }, 1);
}));
