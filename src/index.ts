import './lib/data/itemAliases';

import * as Sentry from '@sentry/node';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { APIInteraction, GatewayDispatchEvents, InteractionResponseType, InteractionType } from 'mahoji';
import { SlashCommandResponse } from 'mahoji/dist/lib/types';
import Mitm from 'mitm';

import { botToken, SENTRY_DSN } from './config';
import { clientOptions } from './lib/config';
import { SILENT_ERROR } from './lib/constants';
import { OldSchoolBotClient } from './lib/structures/OldSchoolBotClient';
import { onStartup } from './mahoji/lib/events';
import { makeMahojiClient } from './mahoji/lib/makeMahojiClient';

process.on('unhandledRejection', error => {
	console.log(error);
	process.exit(1);
});
const mitm = Mitm();

mitm.on('request', req => {
	throw new Error(`Tried to make network request in tests: ${req.url}`);
});

Chart.register(ChartDataLabels);

console.log(55_555_555_555_555_555);

if (SENTRY_DSN) {
	Sentry.init({
		dsn: SENTRY_DSN
	});
}

export const mahojiClient = makeMahojiClient();

export const client = new OldSchoolBotClient(clientOptions);
client.on('raw', async event => {
	if (![GatewayDispatchEvents.InteractionCreate].includes(event.t)) return;
	const data = event.d as APIInteraction;
	const result = await mahojiClient.parseInteraction(data);

	if (result === null) return;

	if ('error' in result) {
		if (result.error.message === SILENT_ERROR) return;

		if (result.type === InteractionType.ApplicationCommand) {
			const ERROR_RESPONSE: SlashCommandResponse = {
				response: {
					data: { content: 'Sorry, an errored occured while trying to run this command.' },
					type: InteractionResponseType.ChannelMessageWithSource
				},
				interaction: result.interaction,
				type: InteractionType.ApplicationCommand
			};
			result.interaction.respond(ERROR_RESPONSE);
		}
		return;
	}
	if (result.type === InteractionType.ApplicationCommand) {
		return result.interaction.respond(result);
	}
	if (result.type === InteractionType.ApplicationCommandAutocomplete) {
		return result.interaction.respond(result);
	}
});
console.log(process.env.NODE_ENV);
client.on('ready', client.init);
client.on('ready', onStartup);
console.log(process.env.NODE_ENV);
if (1 > 2 && process.env.NODE_ENV !== 'test') {
	console.error('NO NO NO NO');
	mahojiClient.start();
	client.login(botToken);
}
