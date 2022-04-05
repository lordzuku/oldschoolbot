import { Task } from 'klasa';
import { Bank } from 'oldschooljs';
import SimpleTable from 'oldschooljs/dist/structures/SimpleTable';

import { getMinionName, incrementMinigameScore } from '../../../lib/settings/settings';
import { MinigameActivityTaskOptions } from '../../../lib/types/minions';
import { handleTripFinish } from '../../../lib/util/handleTripFinish';

const ticketTable = new SimpleTable<number>().add(1, 4).add(2, 4).add(3, 1);

export default class extends Task {
	async run(data: MinigameActivityTaskOptions) {
		const { channelID, quantity, userID } = data;

		incrementMinigameScore(userID, 'castle_wars', quantity);

		const minionName = await getMinionName(userID);

		const user = await this.client.fetchUser(userID);
		const loot = new Bank();
		for (let i = 0; i < quantity; i++) {
			loot.add('Castle wars ticket', ticketTable.roll().item);
		}
		let boosts = [];
		if (user.usingPet('Flappy')) {
			boosts.push('2x tickets for playing with Flappy.');
			loot.multiply(2);
		}
		await user.addItemsToBank({ items: loot, collectionLog: true });

		const boostMsg = boosts.length ? `\n${boosts.join('\n')}` : '';

		handleTripFinish(
			this.client,
			user,
			channelID,
			`<@${userID}>, ${minionName} finished ${quantity}x Castle Wars games and received ${loot}.${boostMsg}`,
			['minigames', { castle_wars: { start: {} } }, true, 'play'],
			undefined,
			data,
			loot
		);
	}
}
