require('dotenv').config({ path: '../.env' });

const RECEIPTS = require('../resources/receipts.json');

const { ZBClient } = require('zeebe-node');

const clientId = process.env.ZEEBE_CLIENT_ID;

const clientSecret = process.env.ZEEBE_CLIENT_SECRET;

const clusterId = process.env.CLOUD_CLUSTER_ID;

if(!clientId || !clientSecret || !clusterId) {
  console.error('Not configured.')
  process.exit(1);
}

const zbc = new ZBClient({
	camundaCloud: {
		clientId,
		clientSecret,
		clusterId,
	},
});

console.log('Start waiting for <fetch-receipts> jobs...')

zbc.createWorker('fetch-receipts', function(job, complete, worker) {
  console.log('Received job for <fetch-receipts>:', job);

  const receipts = getNewReceipts();

  complete.success({
    receipts
  });

});


// helpers /////////////

/**
 * Incredibly magic operation --> return 6 random receipts from "database".
 */
function getNewReceipts() {
  return getRandom(RECEIPTS, 6);
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}