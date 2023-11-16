describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const userData = {
      email: 'test@email.com',
      password: 'Password123!',
    };

    await fetch('http://auth:3001/users', {
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const loginResponse = await fetch('http://auth:3001/auth/login', {
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    jwt = await loginResponse.text();
  });

  test('Create & Get', async () => {
    const createdReservation = await createReservation();

    const getReservationResponse = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );

    const reservation = await getReservationResponse.json();

    expect(createdReservation).toEqual(reservation);
  });

  const createReservation = async () => {
    const reservationData = {
      charge: {
        amount: 247,
        card: {
          cvc: '424',
          exp_month: 12,
          exp_year: 2027,
          number: '4242 4242 4242 4242',
        },
      },
      endDate: '02-03-2023',
      startDate: '02-01-2023',
    };

    const createReservationResponse = await fetch(
      'http://reservations:3000/reservations',
      {
        body: JSON.stringify(reservationData),
        headers: {
          Authentication: jwt,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    return await createReservationResponse.json();
  };
});
