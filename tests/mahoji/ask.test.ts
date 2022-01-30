import { makeSlashCommandInteraction, mockClient } from './util';

describe('ask.test', () => {
	test('ask', async () => {
		try {
			const client = await mockClient();
			expect(client.parseInteraction(makeSlashCommandInteraction('ask', [{ value: 'Magnaboy' }]))).toEqual(1);
		} catch (_) {}
	});
});
