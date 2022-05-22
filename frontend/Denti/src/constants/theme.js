import { Appearance } from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#00B4F6",
    secondary: "#028BF5",
    darkPrimary: "#255FD6",
    background: "#121418",
    white: "#fff",
    grayNorm: "gray",
    lightgray: "#D3D3D3",
    red: "#CD6772",
    green: "#27AE60",
    redDark: "#FF1717",
    blue: '#0064C0',
    darkBlue: "#111A2C",
    darkGray: "#525C67",
    darkGray2: "#757D85",
    gray: "#898B9A",
    gray2: "#BBBDC1",
    gray3: '#CFD0D7',
    lightGray1: "#DDDDDD",
    lightGray2: "#F5F5F8",
    white2: "#FBFBFB",
    white: '#FFFFFF',
    black: "#000000",

    transparent: 'transparent',
    transparentBlack1: "rgba(0, 0, 0, 0.1)",
    transparentBlack7: "rgba(0, 0, 0, 0.7)"

}

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "Poppins-Black", fontSize: SIZES.largeTitle },
    h1: {  fontSize: SIZES.h1, lineHeight: 36 },
    h2: {  fontSize: SIZES.h2, lineHeight: 30 },
    h3: {  fontSize: SIZES.h3, lineHeight: 22 },
    h4: {  fontSize: SIZES.h4, lineHeight: 22 },
    h5: {  fontSize: SIZES.h5, lineHeight: 22 },
    body1: {  fontSize: SIZES.body1, lineHeight: 36 },
    body2: {  fontSize: SIZES.body2, lineHeight: 30 },
    body3: {  fontSize: SIZES.body3, lineHeight: 22 },
    body4: {  fontSize: SIZES.body4, lineHeight: 22 },
    body5: {  fontSize: SIZES.body5, lineHeight: 22 },
};

export const darkTheme = {
    name: "dark",
    backgroundColor: COLORS.black,
    backgroundColor2: COLORS.dark,
    market: "#212121",
    textColor: COLORS.white,
    tabBackgroundColor: COLORS.lightGray,
    cardBackgroundColor: COLORS.gray3,
    bottomTabBarBackgroundColor: COLORS.gray3,
    headerColor: COLORS.yellow,
}

export const lightTheme = {
    name: "light",
    backgroundColor2: COLORS.white,
    backgroundColor: COLORS.white,
    market: "#fff",
    textColor: COLORS.black,
    tabBackgroundColor: COLORS.yellow,
    cardBackgroundColor: COLORS.lightYellow,
    bottomTabBarBackgroundColor: COLORS.lightYellow,
    headerColor: COLORS.red,
}


export const selectedTheme = Appearance.getColorScheme() == 'dark' ? darkTheme : lightTheme


const apptheme = { COLORS, darkTheme, lightTheme, SIZES, FONTS }

export default apptheme;
