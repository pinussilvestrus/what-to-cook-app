# what-to-cook-app

[![CI](https://github.com/pinussilvestrus/what-to-cook-app/workflows/CI/badge.svg)](https://github.com/pinussilvestrus/what-to-cook-app/actions?query=workflow%3ACI)

Simple recipe suggestion application which works on top of a [Camunda Cloud](https://camunda.com/en/products/cloud/) cluster.

## Components

* [`client`](./client) - [Svelte](http://svelte.dev/) frontend application to serve recipes.
* [`worker`](./worker) - Simple [Zeebe](https://zeebe.io/) Node.js worker to suggest random recipes.
* [`app`](./app) - [koa.js](https://koajs.com/) backend application to trigger new fetching workflow.

Head over to [this sketch](https://excalidraw.com/#json=5288444762783744,NxCS_uB1UlkP_kTL-iQRZQ) to gather the basic infrastructure.

## Installation

```sh
npm install
```

Make sure you configure your Camunda Cloud connection accordingly (cf. [`.env.example`](./.env.example)):

```text
ZEEBE_ADDRESS=
ZEEBE_CLIENT_ID=
ZEEBE_CLIENT_SECRET=
CLOUD_CLUSTER_ID=
CLOUD_ORGA_ID=
```

## Run

```
npm start
```

Visit http://localhost:5000.

## License

MIT