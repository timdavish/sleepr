import { ping } from 'tcp-ping';

describe('Health', () => {
  test('Auth', async () => {
    const res = await fetch('http://auth:3001');
    expect(res.ok).toBeTruthy();
  });

  test('Notifications', (done) => {
    ping(
      {
        address: 'notifications',
        port: 3004,
      },
      (error) => {
        if (error) {
          fail();
        }

        done();
      },
    );
  });

  test('Payments', (done) => {
    ping(
      {
        address: 'payments',
        port: 3003,
      },
      (error) => {
        if (error) {
          fail();
        }

        done();
      },
    );
  });

  test('Reservations', async () => {
    const res = await fetch('http://reservations:3000');
    expect(res.ok).toBeTruthy();
  });
});
