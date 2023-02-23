const userController = require('../server/userController');

test('expect userController to have a sign up function', () => {
    expect(userController.signUp).toBe(true);
})