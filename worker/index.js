require('dotenv').config({ path: '../.env' });

const RECIPES = require('../resources/recipes.json');

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

console.log('Start waiting for <fetch-recipes> jobs...')

zbc.createWorker('fetch-recipes', function(job, complete, worker) {
  console.log('Received job for <fetch-recipes>:', job);

  const recipes = getNewRecipes();

  complete.success({
    recipes
  });

});


// helpers /////////////

/**
 * Incredibly magic operation --> return 6 random recipes from "database".
 */
function getNewRecipes() {
  return getRandom(RECIPES, 6);
}

function getRandom(array, number) {
  const length = array.length;

  let result = new Array(number),
    taken = new Array(length);

  if (number > length) {
    throw new RangeError("getRandom: more elements taken than available");
  }
      
  while (number--) {
    const x = Math.floor(Math.random() * length);

    result[number] = array[x in taken ? taken[x] : x];
    
    taken[x] = --length in taken ? taken[length] : length;
  }

  return result;
}