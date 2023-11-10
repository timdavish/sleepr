describe('Health', () => {
  it('should pass', () => {
    expect(true).toBeTruthy();
  });

  test('Auth', async () => {
    const res = await fetch('http://auth:3001/');
    console.log(res);
    expect(res.status).toBe(200);
  });

  test('Reservations', async () => {
    const res = await fetch('http://reservations:3000');
    console.log(res);
    expect(res.status).toBe(200);
  });
});
