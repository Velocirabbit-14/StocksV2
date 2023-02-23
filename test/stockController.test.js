const stockController = require('../server/stockController');

test('expect stockController to have a buy function', () => {
    expect(stockController.buyStock).toBe(true);
})