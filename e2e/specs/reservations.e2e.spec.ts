describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'timdavish@gmail.com',
      password: 'Password123!',
    };

    await fetch('http://auth:3001', {
      body: JSON.stringify(user),
      method: 'POST',
    });
  });

  test('Create', () => {});
});
