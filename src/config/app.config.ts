import { bold } from 'chalk';

export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const port = process.env.PORT || 8000;
export const mode = process.env.NODE_ENV || 'development';

export const appListener = () => {
  const runningMode = `Server running in ${bold(mode)} mode`;
  const runningOnPort = `on port ${bold(port)}`;
  const runningSince = `[since ${new Date().toISOString()}]`;
  console.log(`🏁 —> ${runningMode} ${runningOnPort} ${runningSince}`);
};
