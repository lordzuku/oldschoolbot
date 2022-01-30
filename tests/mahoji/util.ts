import { APIChatInputApplicationCommandGuildInteraction, ICommand } from 'mahoji';
import { convertCommandToAPICommand } from 'mahoji/dist/lib/util';

import { allMahojiCommands } from '../../src/mahoji/lib/util';

export async function mockClient(options?: { clientCommands?: ICommand[]; storeDirs?: null | string[] }) {
	const client = await import('../../src/mahoji/lib/makeMahojiClient').then(i => i.makeMahojiClient());

	if (options?.clientCommands) {
		for (const i of options.clientCommands) {
			client.commands.pieces.set(i.name, i);
		}
	}

	const fn1 = jest.fn();
	client.restManager.put = fn1;
	const fn2 = jest.fn();
	client.restManager.post = fn2;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const fn3 = jest.fn(async (_fullRoute: any, _options?: any) => {
		return [allMahojiCommands.map(convertCommandToAPICommand)];
	});
	client.restManager.get = fn3;

	await client.start();

	return client;
}

export const makeSlashCommandInteraction = (
	commandName: string,
	options: { value: string }[] = []
): APIChatInputApplicationCommandGuildInteraction => {
	return {
		version: 1,
		type: 2,
		token: 'FAKE_TOKEN',
		member: {
			user: {
				username: 'Magnaboy',
				public_flags: 131_712,
				id: '157797566833098752',
				discriminator: '7556',
				avatar: 'a_58c11318d45efbde40e37dd1ac7408b0'
			},
			roles: [
				'346238402737340416',
				'343662808044666881',
				'456181501437018112',
				'670211798091300864',
				'670212713258942467',
				'670212821484568577',
				'706512132899995648',
				'622806157563527178',
				'670211706907000842',
				'693107307076386827',
				'688563389185917072',
				'629057901440532501',
				'706508079184871446',
				'705988292646141983',
				'705987772372221984',
				'923768318442229792',
				'688563780686446649',
				'706510238643388476',
				'705988547202515016',
				'688563333464457304',
				'705988130401943643',
				'829368646182371419',
				'706511231242076253',
				'688563471096348771'
			],
			premium_since: null,
			permissions: '2199023255551',
			pending: false,
			nick: null,
			mute: false,
			joined_at: '2017-08-04T10:53:54.005000+00:00',
			deaf: false,
			avatar: null
		},
		id: '937339644444540998',
		guild_id: '342983479501389826',
		data: {
			type: 1,
			options: options as any,
			name: commandName,
			id: '921610114006392873'
		},
		channel_id: '357422607982919680',
		application_id: '829398443821891634'
	};
};
