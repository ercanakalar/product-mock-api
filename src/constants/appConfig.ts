type Props = {
  baseUrl: string;
  wsUrl: string;
  locales: string[];
};
function AppConfig(): Props {
  return {
    locales: ['tr', 'en'],
    baseUrl: process.env.REACT_APP_BASE_URL ?? '',
    wsUrl: process.env.REACT_APP_BASE_URL?.replace('https', 'wss')?.replace('http', 'ws') ?? '',
  };
}

export default AppConfig();
