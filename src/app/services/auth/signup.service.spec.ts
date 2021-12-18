import SignupService from './signup.service';

describe('unit test for signup service', () => {
  it.todo('should send verification email - spy on pub-sub function');
  it.todo('should create a business user model');
  it.todo('should create a customer user model');
  it('should generate business name without whitespace', async (done) => {
    const service = new SignupService();
    const businessName = ' L ex Co rp ';
    const subscriberId = await service.genSubscriberId(businessName);
    const hasWhiteSpace = /\s+/.test(subscriberId);

    expect(subscriberId).toContain('Lex');
    expect(hasWhiteSpace).toBeFalsy();
    done();
  });
});
