import React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
import { useColorScheme, StyleSheet } from "react-native";
import Theme from "./Theme";

export function RightArrow(props: SvgProps) {
  const colorScheme = useColorScheme();

  return (
    <Svg width="1em" height="1em" viewBox="0 0 61 48" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50.769 27.05H2.896c-3.861 0-3.861-6.12 0-6.12h47.873L35.789 5.304c-2.625-2.9 1.544-7.248 4.324-4.349l19.922 20.94c1.235 1.127 1.235 3.06 0 4.349L40.113 47.023c-2.78 2.9-7.103-1.45-4.324-4.349L50.77 27.05z"
          fill={colorScheme === "light" ? styles.darkThemeIcon.color : styles.lightThemeIcon.color}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h60.961v47.979H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export function LeftArrowCurve(props: SvgProps) {
  const colorScheme = useColorScheme();

  return (
    <Svg width="1em" height="1em" viewBox="0 0 75 80" fill="none" {...props}>
      <Path
        d="M34.344.528c-.88-.704-2.201-.704-3.082 0L0 25.186l31.262 24.657c.44.353 1.028.47 1.615.47s1.174-.117 1.614-.47c.88-.704.88-1.76 0-2.465L8.513 26.948h35.959c14.383 0 26.125 9.392 26.125 20.9v30.058c0 .94 1.027 1.761 2.201 1.761 1.175 0 2.202-.822 2.202-1.76v-30.06c0-13.503-13.65-24.422-30.528-24.422H8.512l25.832-20.43c.881-.588.881-1.762 0-2.467z"
        fill={colorScheme === "light" ? styles.lightThemeIcon.color : styles.darkThemeIcon.color}
      />
    </Svg>
  );
}

export function HamburgerMenu(props: SvgProps) {
  const colorScheme = useColorScheme();

  return (
    <Svg width="1em" height="1em" viewBox="0 0 75 51" fill="none" {...props}>
      <Path
        d="M69.833 0H5.167c-1.37 0-2.684.47-3.654 1.308C.544 2.145 0 3.28 0 4.465c0 1.184.544 2.32 1.513 3.156.97.838 2.284 1.308 3.654 1.308h64.666c1.37 0 2.684-.47 3.654-1.308C74.456 6.784 75 5.65 75 4.465c0-1.185-.544-2.32-1.513-3.157C72.517.47 71.203 0 69.833 0zM69.833 20.74H5.167c-1.37 0-2.684.47-3.654 1.308C.544 22.885 0 24.02 0 25.205s.544 2.32 1.513 3.157c.97.837 2.284 1.307 3.654 1.307h64.666c1.37 0 2.684-.47 3.654-1.307.969-.838 1.513-1.973 1.513-3.157s-.544-2.32-1.513-3.157c-.97-.837-2.284-1.308-3.654-1.308zM75 45.945c0-1.184-.544-2.32-1.513-3.157-.97-.837-2.284-1.308-3.654-1.308H5.167c-1.37 0-2.684.47-3.654 1.308C.544 43.625 0 44.76 0 45.945s.544 2.32 1.513 3.157c.97.837 2.284 1.307 3.654 1.307h64.666c1.37 0 2.684-.47 3.654-1.307.969-.837 1.513-1.973 1.513-3.157z"
        fill={colorScheme === "light" ? styles.lightThemeIcon.color : styles.darkThemeIcon.color}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  lightThemeIcon: {
    color: Theme.wd2,
  },
  darkThemeIcon: {
    color: Theme.wd2,
  }
})