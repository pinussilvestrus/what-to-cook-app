require('dotenv').config({ path: '../.env' });

const Koa = require('koa');

const Router = require('@koa/router');

const cors = require('@koa/cors');

const { ZBClient } = require('zeebe-node');

const clientId = process.env.ZEEBE_CLIENT_ID;

const clientSecret = process.env.ZEEBE_CLIENT_SECRET;

const clusterId = process.env.CLOUD_CLUSTER_ID;

if (!clientId || !clientSecret || !clusterId) {
  console.error('Not configured.');
  process.exit(1);
}

// TODO: consider re-establishing connection for every call, once config could change
const zbc = new ZBClient({
  camundaCloud: {
    clientId,
    clientSecret,
    clusterId,
  },
});

const app = new Koa();

app.use(cors());

const router = new Router();

router.get('/fetch', async (context) => {

  console.log('executing process ...');

  // execute workflow
  const result = await zbc.createWorkflowInstanceWithResult({
    bpmnProcessId: 'Process_1'
  });

  const {
    variables
  } = result;

  context.body = variables.recipes;
});

router.get('/ping', async (context) => {

  console.log('ping cluster ...');

  try {
    await zbc.topology();
    context.status = 200;
  } catch (err) {
    context.status = err.status || 500;
  }
});

app.use(router.routes());

app.listen(3000);

console.log('Started server on http://localhost:3000');