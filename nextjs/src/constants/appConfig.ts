type Props = {
  baseUrl: string;
  wsUrl: string;
  locales: string[];
};
function AppConfig(): Props {
  return {
    locales: ['tr', 'en'],
    baseUrl: process.env.API_URL ?? '',
    wsUrl: process.env.API_URL?.replace('https', 'wss')?.replace('http', 'ws') ?? '',
  };
}

export default AppConfig();
