import { CommandStore, KlasaMessage } from 'klasa';

import { COMMAND_BECAME_SLASH_COMMAND_MESSAGE } from '../../lib/constants';
import { BotCommand } from '../../lib/structures/BotCommand';

export default class extends BotCommand {
	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['lp']
		});
	}

	async run(msg: KlasaMessage) {
		return msg.channel.send(COMMAND_BECAME_SLASH_COMMAND_MESSAGE(msg, 'gamble lucky_pick'));
	}
}
