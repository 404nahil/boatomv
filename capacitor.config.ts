import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'boatomv',
  webDir: 'out',

  server: {
    url: 'http://10.111.116.6:3000',
    cleartext: true
  }
};

export default config;
