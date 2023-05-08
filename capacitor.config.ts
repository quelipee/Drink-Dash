import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'test',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    cleartext:true,
  }
};

export default config;
