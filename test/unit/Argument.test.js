const Argument = require('../../src/Argument');

describe('Argument', () => {
    it('should return true when required argument is not null', () => {
        const _args = ['dummytext'];
        const pattern = 'argument:required';

        const args = new Argument(_args, pattern, false);
        expect(args.checkArguments(null, '!test')).toBe(true);
    });

    it('should return false when required argument is null', () => {
        const _args = [];
        const pattern = 'argument:required';

        const args = new Argument(_args, pattern, false);
        expect(args.checkArguments(null, '!test')).toBe(false);
    });

    it('should return null when pattern ends with :required but getArgument not', () => {
        const _args = ['dummy text spread'];
        const pattern = 'argument:required';

        const args = new Argument(_args, pattern, true);
        expect(args.getArgument('argument')).toBe(null);
    });

    it('Some Test 1: must return dummy text spread', () => {
        const _args = ['dummy text spread'];
        const pattern = 'argument:required';

        const args = new Argument(_args, pattern, true);
        expect(args.getArgument('argument:required')).toBe('dummy text spread');
    });

    it('Some Test 2: must return text spread', () => {
        const _args = ['dummy', 'text spread'];
        const pattern = 'argument:required argument2';

        const args = new Argument(_args, pattern, true);
        expect(args.getArgument('argument2')).toBe('text spread');
    });
});
