
export const logger = {
  error: (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(...args);
    }
  }
};