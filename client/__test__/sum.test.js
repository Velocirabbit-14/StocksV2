import sum from '../../sum'

describe('should sum the passed in arguments', () => {
    
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
      });


})