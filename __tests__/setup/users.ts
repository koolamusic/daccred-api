export const subscriber = {
  sub: '60979658cd1c804e241b772f',
  scope: 'business',
  role: 'subscriber',
  profile: {
    email: 'andew@worldtee.com',
    name: 'Andrew M',
    business: true,
    subscriber_id: 'subx2eDEYJM2zBFOv0UkHdufybR3',
  },
  permissions: [
    [
      'read_one',
      'User',
      {
        id: '60979658cd1c804e241b772f',
      },
    ],
    [
      'update',
      'User',
      {
        id: '60979658cd1c804e241b772f',
      },
    ],
    ['create', 'User', 0, 1, 0, 'user creation not allowed, did you want to create an employee?'],
    [
      'delete',
      'User',
      {
        id: {
          $eq: '60979658cd1c804e241b772f',
        },
      },
    ],
    [
      'read_one',
      'Role',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        userId: '60979658cd1c804e241b772f',
      },
    ],
    [
      'read_all',
      'Role',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        userId: '60979658cd1c804e241b772f',
      },
    ],
    [
      'update',
      'Role',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        userId: '60979658cd1c804e241b772f',
      },
    ],
    ['create', 'Role', 0, 1, 0, 'you cannot create new user roles at this moment'],
    [
      'delete',
      'Role',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        userId: '60979658cd1c804e241b772f',
      },
    ],
    [
      'read_one',
      'Subscriber',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
      },
    ],
    ['read_all', 'Subscriber', 0, 1, 0, 'you are not allowed to access subscribers'],
    [
      'update',
      'Subscriber',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        ownerId: '60979658cd1c804e241b772f',
      },
    ],
    [
      'create',
      'Subscriber',
      {
        role: 'subscriber',
      },
    ],
    [
      'delete',
      'Subscriber',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        ownerId: '60979658cd1c804e241b772f',
      },
    ],
    [
      'read_one',
      'Employee',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        invitedBy: '60979658cd1c804e241b772f',
      },
    ],
    [
      'read_all',
      'Employee',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
      },
    ],
    [
      'update',
      'Employee',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        invitedBy: '60979658cd1c804e241b772f',
      },
    ],
    [
      'create',
      'Employee',
      {
        role: 'subscriber',
      },
    ],
    [
      'delete',
      'Employee',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
        invitedBy: '60979658cd1c804e241b772f',
      },
    ],
    [
      'read_one',
      'PaymentMerchant',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
      },
    ],
    [
      'read_all',
      'PaymentMerchant',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
      },
    ],
    [
      'update',
      'PaymentMerchant',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
      },
    ],
    [
      'create',
      'PaymentMerchant',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
      },
    ],
    [
      'delete',
      'PaymentMerchant',
      {
        subscriberId: 'subx2eDEYJM2zBFOv0UkHdufybR3',
        role: 'subscriber',
      },
    ],
  ],
};
