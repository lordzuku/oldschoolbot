import { KlasaUser } from 'klasa';
import { Bank } from 'oldschooljs';

import { chompyHats } from '../../../commands/Minion/chompyhunt';
import { MAX_QP } from '../../constants';
import { CombatCannonItemBank } from '../../minions/data/combatConstants';
import { MinigameName } from '../../settings/settings';
import { ItemBank, Skills } from '../../types';
import { resolveNameBank } from '../../util';
import itemID from '../../util/itemID';
import { canifisClothes } from './canifisClothes';
import { capeBuyables } from './capes';
import { castleWarsBuyables } from './castleWars';
import { fremennikClothes } from './frem';
import { gnomeClothes } from './gnomeClothes';
import { miningBuyables } from './mining';
import { perduBuyables } from './perdu';
import { runeBuyables } from './runes';
import { slayerBuyables } from './slayerBuyables';

export interface Buyable {
	name: string;
	outputItems?: ItemBank | Bank;
	qpRequired?: number;
	gpCost?: number;
	itemCost?: ItemBank;
	aliases?: string[];
	skillsNeeded?: Skills;
	restockTime?: number;
	minigameScoreReq?: [MinigameName, number];
	ironmanPrice?: number;
	collectionLogReqs?: number[];
	customReq?: (user: KlasaUser) => Promise<[true] | [false, string]>;
}

const randomEventBuyables: Buyable[] = [
	{
		name: 'Prince outfit',
		itemCost: resolveNameBank({
			'Frog token': 1
		}),
		outputItems: resolveNameBank({
			'Prince tunic': 1,
			'Prince leggings': 1
		})
	},
	{
		name: 'Princess outfit',
		itemCost: resolveNameBank({
			'Frog token': 1
		}),
		outputItems: resolveNameBank({
			'Princess blouse': 1,
			'Princess skirt': 1
		})
	},
	{
		name: 'Frog mask',
		itemCost: resolveNameBank({
			'Frog token': 1
		}),
		outputItems: resolveNameBank({
			'Frog mask': 1
		})
	}
];

const tobCapes: Buyable[] = [
	{
		name: 'Sinhaza shroud tier 1',
		gpCost: 100_000,
		minigameScoreReq: ['tob', 100]
	},
	{
		name: 'Sinhaza shroud tier 2',
		gpCost: 500_000,
		minigameScoreReq: ['tob', 500]
	},
	{
		name: 'Sinhaza shroud tier 3',
		gpCost: 500_000,
		minigameScoreReq: ['tob', 1000]
	},
	{
		name: 'Sinhaza shroud tier 4',
		gpCost: 500_000,
		minigameScoreReq: ['tob', 1500]
	},
	{
		name: 'Sinhaza shroud tier 5',
		gpCost: 500_000,
		minigameScoreReq: ['tob', 2000]
	}
];

const cmCapes: Buyable[] = [
	{
		name: "Xeric's guard",
		gpCost: 100_000,
		minigameScoreReq: ['raids_challenge_mode', 100]
	},
	{
		name: "Xeric's warrior",
		gpCost: 500_000,
		minigameScoreReq: ['raids_challenge_mode', 500]
	},
	{
		name: "Xeric's sentinel",
		gpCost: 1_000_000,
		minigameScoreReq: ['raids_challenge_mode', 1000]
	},
	{
		name: "Xeric's general",
		gpCost: 1_500_000,
		minigameScoreReq: ['raids_challenge_mode', 1500]
	},
	{
		name: "Xeric's champion",
		gpCost: 2_000_000,
		minigameScoreReq: ['raids_challenge_mode', 2000]
	}
];

const constructionBuyables: Buyable[] = [
	{ name: 'Bolt of cloth', outputItems: resolveNameBank({ 'Bolt of cloth': 1 }), gpCost: 5000 },
	{
		name: 'Limestone brick',
		gpCost: 1000
	},
	{
		name: 'Gold leaf',
		gpCost: 500_000
	},
	{
		name: 'Marble block',
		gpCost: 1_000_000
	},
	{
		name: 'Magic stone',
		gpCost: 4_000_000
	},
	{
		name: 'Red dye',
		gpCost: 100_000
	},
	{
		name: 'Skull',
		gpCost: 100_000
	},
	{
		name: 'Fairy enchantment',
		gpCost: 100_000,
		qpRequired: 23
	},
	{
		name: 'Ancient signet',
		gpCost: 100_000,
		qpRequired: 105
	},
	{
		name: 'Lunar signet',
		gpCost: 100_000,
		qpRequired: 52
	},
	{
		name: 'Bucket of water',
		gpCost: 500
	}
];

const sepulchreBuyables: Buyable[] = [
	{
		name: 'Hallowed crystal shard',
		itemCost: resolveNameBank({ 'Hallowed mark': 1 })
	},
	{
		name: 'Hallowed token',
		itemCost: resolveNameBank({ 'Hallowed mark': 10 })
	},
	{
		name: 'Hallowed grapple',
		itemCost: resolveNameBank({ 'Hallowed mark': 100 })
	},
	{
		name: 'Hallowed focus',
		itemCost: resolveNameBank({ 'Hallowed mark': 100 })
	},
	{
		name: 'Hallowed symbol',
		itemCost: resolveNameBank({ 'Hallowed mark': 100 })
	},
	{
		name: 'Hallowed hammer',
		itemCost: resolveNameBank({ 'Hallowed mark': 100 })
	},
	{
		name: 'Hallowed ring',
		itemCost: resolveNameBank({ 'Hallowed mark': 250 })
	},
	{
		name: 'Dark dye',
		itemCost: resolveNameBank({ 'Hallowed mark': 300 })
	},
	{
		name: 'Dark acorn',
		outputItems: resolveNameBank({ 'Dark acorn': 1 }),
		itemCost: resolveNameBank({ 'Hallowed mark': 3000 })
	},
	{
		name: 'Dark squirrel',
		itemCost: resolveNameBank({ 'Dark acorn': 1, 'Giant squirrel': 1 })
	}
];

const hunterBuyables: Buyable[] = [
	{
		name: 'Butterfly jar',
		gpCost: 500
	},
	{
		name: 'Magic box',
		gpCost: 1500
	}
];

const questBuyables: Buyable[] = [
	{
		name: 'Goldsmith gauntlets',
		outputItems: {
			[itemID('Goldsmith gauntlets')]: 1
		},
		qpRequired: 25,
		gpCost: 1_000_000,
		ironmanPrice: 25_000
	},
	{
		name: 'Cooking gauntlets',
		qpRequired: 25,
		gpCost: 1_000_000,
		ironmanPrice: 25_000
	},
	{
		name: 'Anti-dragon shield',
		qpRequired: 35,
		gpCost: 10_000
	},
	{
		name: 'Hardleather gloves',
		qpRequired: 5,
		gpCost: 50_000,
		ironmanPrice: 65
	},
	{
		name: 'Bronze gloves',
		qpRequired: 10,
		gpCost: 100_000,
		ironmanPrice: 130
	},
	{
		name: 'Iron gloves',
		qpRequired: 20,
		gpCost: 200_000,
		ironmanPrice: 325
	},
	{
		name: 'Steel gloves',
		qpRequired: 25,
		gpCost: 300_000,
		ironmanPrice: 650
	},
	{
		name: 'Black gloves',
		qpRequired: 35,
		gpCost: 400_000,
		ironmanPrice: 1000
	},
	{
		name: 'Mithril gloves',
		qpRequired: 50,
		gpCost: 500_000,
		ironmanPrice: 2000
	},
	{
		name: 'Adamant gloves',
		qpRequired: 65,
		gpCost: 600_000,
		ironmanPrice: 3250
	},
	{
		name: 'Rune gloves',
		outputItems: {
			[itemID('Rune gloves')]: 1
		},
		qpRequired: 85,
		gpCost: 700_000,
		ironmanPrice: 6500
	},
	{
		name: 'Dragon gloves',
		qpRequired: 107,
		gpCost: 850_000,
		ironmanPrice: 130_000
	},
	{
		name: 'Barrows gloves',
		qpRequired: 175,
		gpCost: 1_000_000,
		ironmanPrice: 130_000
	},
	{
		name: 'Helm of neitiznot',
		qpRequired: 75,
		gpCost: 500_000,
		ironmanPrice: 50_000
	},
	{
		name: 'Magic secateurs',
		qpRequired: 40,
		gpCost: 2_500_000,
		ironmanPrice: 40_000
	},
	{
		name: "Iban's staff",
		aliases: ['iban'],
		qpRequired: 30,
		gpCost: 300_000
	},
	{
		name: 'Barrelchest anchor',
		aliases: ['anchor'],
		qpRequired: 30,
		gpCost: 2_000_000
	},
	{
		name: 'Mythical cape',
		gpCost: 1_000_000,
		qpRequired: 205,
		ironmanPrice: 10_000
	},
	{
		name: 'Mind shield',
		gpCost: 100_000,
		qpRequired: 35
	},
	{
		name: 'Dwarven helmet',
		gpCost: 100_000,
		qpRequired: 52
	},
	{
		name: 'Amulet of accuracy',
		gpCost: 50_000,
		qpRequired: 5
	},
	{
		name: 'Cape of legends',
		gpCost: 250_000,
		qpRequired: 105
	},
	{
		name: 'Bearhead',
		gpCost: 1_000_000,
		qpRequired: 105
	},
	{
		name: 'Bonesack',
		gpCost: 1_000_000,
		qpRequired: 82
	},
	{
		name: 'Ram skull helm',
		gpCost: 1_000_000,
		qpRequired: 82
	},
	{
		name: 'Monkey',
		outputItems: {
			19_556: 1
		},
		gpCost: 1_000_000,
		qpRequired: 182
	},
	{
		name: 'Rat pole',
		gpCost: 200_000,
		qpRequired: 85
	},
	{
		name: 'Silverlight',
		gpCost: 50_000,
		qpRequired: 3
	},
	{
		name: 'Darklight',
		gpCost: 200_000,
		qpRequired: 58
	},
	{
		name: 'Lunar Outfit',
		outputItems: resolveNameBank({
			'Lunar boots': 1,
			'Lunar cape': 1,
			'Lunar gloves': 1,
			'Lunar helm': 1,
			'Lunar legs': 1,
			'Lunar torso': 1,
			'Lunar amulet': 1,
			'Lunar ring': 1,
			'Lunar staff': 1
		}),
		gpCost: 5_000_000,
		qpRequired: 120
	},
	{
		name: 'Moonclan Outfit',
		outputItems: resolveNameBank({
			'Moonclan boots': 1,
			'Moonclan cape': 1,
			'Moonclan gloves': 1,
			'Moonclan helm': 1,
			'Moonclan hat': 1,
			'Moonclan skirt': 1,
			'Moonclan armour': 1
		}),
		gpCost: 5_000_000,
		qpRequired: 120
	},
	{
		name: 'Jester Outfit',
		outputItems: resolveNameBank({
			'Silly jester hat': 1,
			'Silly jester top': 1,
			'Silly jester tights': 1,
			'Silly jester boots': 1
		}),
		gpCost: 5_000_000,
		qpRequired: 89
	},
	{
		name: 'Ardougne Knight Outfit',
		outputItems: resolveNameBank({
			'Ardougne knight helm': 1,
			'Ardougne knight platebody': 1,
			'Ardougne knight platelegs': 1
		}),
		gpCost: 5_000_000,
		qpRequired: 200
	},
	{
		name: 'Desert Outfit',
		outputItems: resolveNameBank({
			Fez: 1,
			'Desert top': 1,
			'Desert legs': 1,
			'Desert robes': 1,
			'Desert boots': 1,
			'Desert shirt': 1,
			'Desert robe': 1
		}),
		gpCost: 1_000_000,
		qpRequired: 20
	},
	{
		name: 'Pirate boots',
		outputItems: resolveNameBank({
			'Pirate boots': 1
		}),
		gpCost: 100_000,
		qpRequired: 20
	},
	{
		name: 'Vyrewatch outfit',
		outputItems: resolveNameBank({
			'Vyrewatch top': 1,
			'Vyrewatch legs': 1,
			'Vyrewatch shoes': 1
		}),
		gpCost: 1_000_000,
		qpRequired: 92
	},
	{
		name: 'Climbing boots',
		outputItems: resolveNameBank({
			'Climbing boots': 1
		}),
		gpCost: 100_000,
		qpRequired: 20
	},
	{
		name: 'Warrior helm',
		gpCost: 780_000,
		qpRequired: 60,
		ironmanPrice: 78_000
	},
	{
		name: 'Berserker helm',
		gpCost: 780_000,
		qpRequired: 60,
		ironmanPrice: 78_000
	},
	{
		name: 'Archer helm',
		gpCost: 780_000,
		qpRequired: 60,
		ironmanPrice: 78_000
	},
	{
		name: 'Farseer helm',
		gpCost: 780_000,
		qpRequired: 60,
		ironmanPrice: 78_000
	},
	{
		name: "Doctor's hat",
		gpCost: 60_000,
		qpRequired: 60
	},
	{
		name: 'Medical gown',
		gpCost: 60_000,
		qpRequired: 60
	},
	{
		name: 'Ring of charos',
		gpCost: 100_000,
		qpRequired: 60
	},
	{
		name: 'Nurse hat',
		gpCost: 60_000,
		qpRequired: 60
	},
	{
		name: 'Holy wrench',
		gpCost: 70_000,
		qpRequired: 70
	},
	{
		name: 'Initiate outfit',
		outputItems: resolveNameBank({
			'Initiate sallet': 1,
			'Initiate hauberk': 1,
			'Initiate cuisse': 1
		}),
		gpCost: 250_000,
		qpRequired: 35
	},
	{
		name: 'Proselyte outfit',
		outputItems: resolveNameBank({
			'Proselyte sallet': 1,
			'Proselyte hauberk': 1,
			'Proselyte cuisse': 1,
			'Proselyte tasset': 1
		}),
		gpCost: 500_000,
		qpRequired: 75
	},
	{
		name: 'Excalibur',
		gpCost: 50_000,
		qpRequired: 15
	},
	{
		name: 'Bomber jacket',
		gpCost: 50_000,
		qpRequired: 21
	},
	{
		name: 'Bomber cap',
		gpCost: 50_000,
		qpRequired: 21
	},
	{
		name: 'Pet rock',
		gpCost: 500_000,
		qpRequired: 60
	},
	{
		name: 'Dwarf multicannon',
		outputItems: CombatCannonItemBank,
		gpCost: 10_000_000,
		qpRequired: 5,
		ironmanPrice: 750_000
	},
	{
		name: 'Cannon barrels',
		gpCost: 2_500_000,
		qpRequired: 5,
		ironmanPrice: 200_625
	},
	{
		name: 'Cannon base',
		gpCost: 2_500_000,
		qpRequired: 5,
		ironmanPrice: 200_625
	},
	{
		name: 'Cannon furnace',
		gpCost: 2_500_000,
		qpRequired: 5,
		ironmanPrice: 200_625
	},
	{
		name: 'Cannon stand',
		gpCost: 2_500_000,
		qpRequired: 5,
		ironmanPrice: 200_625
	},
	{
		name: 'Elemental shield',
		gpCost: 2_500_000,
		qpRequired: 25,
		ironmanPrice: 2000
	}
];

const noveltyFood: Buyable[] = [
	{
		name: 'Beer',
		gpCost: 1_000_000
	},
	{
		name: 'Vodka',
		gpCost: 1_000_000
	},
	{
		name: 'Gin',
		gpCost: 1_000_000
	}
];

const Buyables: Buyable[] = [
	{
		name: 'Quest point cape',
		outputItems: {
			[itemID('Quest point cape')]: 1,
			[itemID('Quest point hood')]: 1
		},
		aliases: ['quest cape'],
		qpRequired: MAX_QP,
		gpCost: 99_000
	},
	{
		name: 'Fishing Bait',
		aliases: ['fishing bait'],
		gpCost: 20,
		ironmanPrice: 3
	},
	{
		name: 'Jug of Water',
		aliases: ['jug of water', 'jugs of water'],
		gpCost: 100
	},

	{
		name: 'Feather',
		aliases: ['feather'],
		gpCost: 50,
		ironmanPrice: 2
	},
	{
		name: 'Shield right half',
		aliases: ['shield right half', 'right shield'],
		qpRequired: 111,
		gpCost: 1_000_000
	},
	{
		name: 'Dragon metal shard',
		aliases: ['metal shard'],
		qpRequired: 205,
		gpCost: 2_500_000
	},
	{
		name: 'Eye of newt',
		aliases: ['eye of newt', 'newt eye'],
		gpCost: 300,
		ironmanPrice: 3
	},
	{
		name: 'Vial of water',
		aliases: ['vial of water'],
		gpCost: 60,
		ironmanPrice: 3
	},
	{
		name: 'Vial',
		aliases: ['vial'],
		gpCost: 30,
		ironmanPrice: 2
	},
	{
		name: 'Cup of hot water',
		aliases: ['cup of hot water', 'hot water'],
		gpCost: 1500
	},
	{
		name: 'Chocolate bar',
		aliases: ['chocolate bar', 'chocolate'],
		gpCost: 1000
	},
	{
		name: 'Ball of wool',
		aliases: ['wool ball', 'ball wool'],
		gpCost: 300
	},
	{
		name: 'Compost',
		gpCost: 400
	},
	{
		name: 'Amylase pack',
		outputItems: {
			[itemID('Amylase crystal')]: 100
		},
		itemCost: resolveNameBank({ 'Mark of grace': 10 })
	},
	{
		name: 'Dragon scimitar',
		gpCost: 500_000,
		qpRequired: 105
	},
	{
		name: 'Fishbowl pet',
		outputItems: {
			6672: 1
		},
		gpCost: 500_000
	},
	{
		name: 'Potato with cheese',
		gpCost: 650,
		skillsNeeded: {
			attack: 65,
			strength: 65
		}
	},
	{
		name: 'Torstol',
		itemCost: resolveNameBank({ 'Torstol potion (unf)': 1 })
	},
	{
		name: 'Ogre bow',
		gpCost: 10_000
	},
	{
		name: 'Salve amulet',
		gpCost: 200_000,
		skillsNeeded: {
			crafting: 35
		},
		qpRequired: 58
	},
	{
		name: 'Sandworms',
		gpCost: 500
	},
	{
		name: 'Granite Body',
		gpCost: 95_000,
		minigameScoreReq: ['barb_assault', 10]
	},
	{
		name: 'Raw shark',
		itemCost: resolveNameBank({
			Minnow: 40
		}),
		outputItems: resolveNameBank({
			'Raw shark': 1
		})
	},

	...sepulchreBuyables,
	...constructionBuyables,
	...hunterBuyables,
	...questBuyables,
	...noveltyFood,
	...fremennikClothes,
	...gnomeClothes,
	...canifisClothes,
	...castleWarsBuyables,
	...cmCapes,
	...slayerBuyables,
	...capeBuyables,
	...miningBuyables,
	...runeBuyables,
	...randomEventBuyables,
	...tobCapes,
	...perduBuyables
];

for (const [chompyHat, qty] of chompyHats) {
	Buyables.push({
		name: chompyHat.name,
		outputItems: new Bank().add(chompyHat.id).bank,
		gpCost: qty * 44,
		minigameScoreReq: ['big_chompy_bird_hunting', qty]
	});
}

export default Buyables;
