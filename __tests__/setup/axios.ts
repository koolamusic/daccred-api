module.exports = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  all: jest.fn(() => Promise.resolve({ data: {} })),
  spread: jest.fn(() => Promise.resolve({ data: {} })),
  interceptors: {
    response: {
      use: jest.fn(),
    },
    request: {
      use: jest.fn(),
    },
  },
};
