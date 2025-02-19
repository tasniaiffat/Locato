import "dotenv/config";

export default {
  expo: {
    name: "locato",
    newArchEnabled: true,
    slug: "locato",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/LocatoLogo.png",
    scheme: "locato",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/favicon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "locato-ios",
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/favicon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.jamal_uddin.locato",
      googleServicesFile: "./android/app/google-services.json",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },
    extra: {
      eas: {
        projectId: "058782dc-3c1d-4c84-aa00-5d29a1ece024",
      },
    },
    owner: "sdp_project",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/locato-favicon.png",
  },
  plugins: ["expo-router", "expo-font"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "b4cccfa0-0930-457f-bd42-e368e7620a37",
    },
  },
  owner: "jamal_uddin",
};
