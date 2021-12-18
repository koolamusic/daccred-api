describe('unit test for request password reset', () => {
  it.todo('should generate a password reset token and persist to user model');
  it.todo('should send password reset email - spy on pub-sub function');
});

describe('change user password', () => {
  it.todo('should change user password in model');
  it.todo('should throw error on invalid reset token');
  it.todo('should throw error on reset duration expired');
});
