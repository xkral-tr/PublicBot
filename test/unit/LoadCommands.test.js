const { loadCommands } = require('../../src/utils/LoadCommands');
const { commandsDir } = require('../../settings.json');

jest.useFakeTimers();

describe('Load Commands', () => {
    it('should load all commands', () => {
        loadCommands(commandsDir).then((result) => {
            expect(result).toBe('All commands loaded.');
        });
    });

    it('should say there is no command', () => {
        const emptyDir = '../../test/unit/leave_me_empty';

        loadCommands(emptyDir).then((result) => {
            expect(result).toBe('There is no command.');
        });
    });
});
