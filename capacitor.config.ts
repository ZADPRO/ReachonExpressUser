import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.zadroit.reachonexpress",
  appName: "reachon-express",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    Keyboard: {
      resize: "body", // Options: "native", "body", "ionic"
      resizeOnFullScreen: true,
    },
  },
};

export default config;
