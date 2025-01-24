/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
export const grey = "#2a323d";
export const lightblue = 'lightblue'
export const background = '#375f6f'

export const Colors = {
  light: {
    text: '#11181C',
    textWhite: '#fff',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    errorText: '#FF0000',
  },
  dark: {
    text: '#ECEDEE',
    textWhite: '#fff',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    errorText: '#FF0000',
  },
};

export const colors = Colors.light;
