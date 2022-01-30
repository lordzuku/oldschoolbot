import { MahojiClient } from 'mahoji';
import { join } from 'node:path';

import { botToken } from '../../config';
import { postCommand } from './postCommand';
import { preCommand } from './preCommand';
import { convertMahojiCommandToAbstractCommand } from './util';

export function makeMahojiClient() {
	return new MahojiClient({
		discordToken: botToken,
		developmentServerID: '342983479501389826',
		applicationID: '829398443821891634',
		storeDirs: [join('dist', 'mahoji')],
		handlers: {
			preCommand: ({ command, interaction }) =>
				preCommand({
					abstractCommand: convertMahojiCommandToAbstractCommand(command),
					userID: interaction.userID.toString(),
					guildID: interaction.guildID.toString(),
					channelID: interaction.channelID.toString()
				}),
			postCommand: ({ command, interaction, error }) =>
				postCommand({
					abstractCommand: convertMahojiCommandToAbstractCommand(command),
					userID: interaction.userID.toString(),
					guildID: interaction.guildID.toString(),
					channelID: interaction.channelID.toString(),
					args: interaction.options,
					error,
					msg: null,
					isContinue: false
				})
		}
	});
}
