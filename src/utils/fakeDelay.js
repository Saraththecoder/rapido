/**
 * Helper to simulate network latency / async delay
 * @param {number} ms - milliseconds to delay
 * @returns {Promise<void>}
 */
export const fakeDelay = (ms = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
