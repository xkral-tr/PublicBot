const { loadCommands } = require('../../src/utils/LoadCommands');
const { commandsDir } = require('../../settings.json');

jest.useFakeTimers();

describe('Load Commands', () => {
    it('should load all commands', () => {
        return loadCommands(commandsDir).then((result) => {
            expect(result).toBe('All commands loaded.');
        });
    });

    it('should say there is no command', () => {
        const dir = '__there_is_no_dir__';

        return loadCommands(dir).then((result) => {
            expect(result).toBe('There is no command.');
        });
    });
});
