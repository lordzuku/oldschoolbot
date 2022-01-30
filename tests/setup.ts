import '../src/lib/data/itemAliases';

import Mitm from 'mitm';

process.on('unhandledRejection', error => {
	console.log(error);
	process.exit(1);
});
const mitm = Mitm();

mitm.on('request', req => {
	throw new Error(`Tried to make network request in tests: ${req.url}`);
});
