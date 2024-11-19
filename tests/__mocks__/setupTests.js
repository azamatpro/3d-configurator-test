import { TextEncoder, TextDecoder } from 'util';

// Polyfill
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mocking fetch if necessary
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);
