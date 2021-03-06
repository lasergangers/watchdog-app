import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  BackHandler,
  Pressable,
  Text,
  PermissionsAndroid,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import backAction from "../utils/BackAction";
import { LeftArrowCurve } from "../utils/Icons";
import Button from "../components/Button";
import { TextInput } from "react-native-paper";
// import { BleManager } from "react-native-ble-plx";
import Theme from "../utils/Theme";

const WifiSetup = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  // const manager = new BleManager();

  const saveWifiSetupScreenState = async () => {
    try {
      if (wifiName && wifiPassword) {
        await AsyncStorage.setItem("finished_wifi_setup", wifiName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "watchdog",
          message:
            "Location permission is required to connect with or scan for WiFi networks. ",
          buttonNegative: "DENY",
          buttonPositive: "ACCEPT",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        NetInfo.fetch().then((state) => {
          // @ts-ignore: Object is possibly 'null'.
          setWifiName(state.details.ssid);
        });
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // const scanAndConnect = () => {
  //   try {
  //     console.log("Scanning");
  //     manager.startDeviceScan(null, null, async (err, device) => {
  //       console.log(device?.id);
  //       if (device?.name === "Watchdog Alarm") {
  //         manager.stopDeviceScan();
  //         console.log("Device ID: ", device.id);
  //         console.log("Device Name: ", device.name);
  //         console.log("Device RSSI", device.rssi);
  //         console.log("Device MTU: ", device.mtu);

  //         device
  //           .connect()
  //           .then((device) => {
  //             const services = device.discoverAllServicesAndCharacteristics();
  //             console.log(services);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const themeTextInputStyle =
    colorScheme === "light" ? styles.lightTextInput : styles.darkTextInput;

  useEffect(
    () => {
      requestLocationPermission();
      BackHandler.addEventListener("hardwareBackPress", backAction);
      saveWifiSetupScreenState();

      // manager.onStateChange(() => {
      //   const subscription = manager.onStateChange((state) => {
      //     if (state === "PoweredOn") {
      //       scanAndConnect();
      //       subscription.remove();
      //     }
      //   }, true);
      //   return () => subscription.remove();
      // });

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    },
    [
      /*manager*/
    ]
  );

  return (
    <View style={[styles.WifiSetupScreen, themeContainerStyle]}>
      <StatusBar style="auto" />
      <View style={styles.NavigationContainer}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <LeftArrowCurve height={25} width={25} />
        </Pressable>
      </View>
      <View style={styles.AppContainer}>
        <View style={styles.HeadingContainer}>
          <Text style={[styles.Title, themeTextStyle]}>Setup your device</Text>
          <Text style={[styles.Subtitle, themeTextStyle]}>
            Please enable location and bluetooth permissions to connect to your
            device.
          </Text>
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            label="Wi-Fi Name"
            value={wifiName}
            mode="flat"
            onChangeText={(wifiName) => setWifiName(wifiName)}
            style={[styles.TextInput, themeTextInputStyle]}
            theme={{
              colors: {
                primary:
                  colorScheme === "light"
                    ? styles.lightThemeText.color
                    : styles.darkThemeText.color,
                placeholder: "#7E7F8A",
                text:
                  colorScheme === "light"
                    ? styles.lightThemeText.color
                    : styles.darkThemeText.color,
              },
            }}
          />
          <TextInput
            label="Wi-Fi Password"
            value={wifiPassword}
            mode="flat"
            onChangeText={(wifiPassword) => setWifiPassword(wifiPassword)}
            style={[styles.TextInput, themeTextInputStyle]}
            right={
              <TextInput.Icon
                // name="eye-off-outline"
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                color="#7E7F8A"
                onPress={() => setShowPassword(!showPassword)}
                style={{ marginRight: 20 }}
              />
            }
            secureTextEntry={showPassword}
            theme={{
              colors: {
                primary:
                  colorScheme === "light"
                    ? styles.lightThemeText.color
                    : styles.darkThemeText.color,
                placeholder: "#7E7F8A",
                text:
                  colorScheme === "light"
                    ? styles.lightThemeText.color
                    : styles.darkThemeText.color,
              },
            }}
          />
        </View>
        <View
          style={[
            {
              flex: 0.1,
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <Text style={{ fontSize: 12, color: "#434C5E" }}>
            {Constants.manifest?.version}
          </Text>
          <Button
            ButtonText="Let's go"
            disabled={!wifiPassword || !wifiName}
            onPress={() => {
              navigation.navigate("Homescreen");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default WifiSetup;

const styles = StyleSheet.create({
  WifiSetupScreen: {
    flex: 1,
    width: "100%",
    padding: 40,
    justifyContent: "space-between",
  },
  NavigationContainer: {
    width: "100%",
    paddingTop: 20,
  },
  AppContainer: {
    width: "100%",
    flex: 0.95,
  },
  HeadingContainer: {
    width: "100%",
  },
  Title: {
    fontSize: 36,
    fontWeight: "700",
  },
  Subtitle: {
    fontSize: 18,
    paddingTop: 10,
  },
  InputContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  TextInput: {
    // For some reason, borderRadius only effects bottom one
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#7E7F8A",
    color: "red",
    borderWidth: 1,
    height: 60,
    overflow: "hidden",
  },
  lightContainer: {
    backgroundColor: Theme.wd2,
  },
  darkContainer: {
    backgroundColor: Theme.wd1,
  },
  lightThemeText: {
    color: Theme.wd1,
  },
  darkThemeText: {
    color: Theme.wd2,
  },
  lightTextInput: {
    backgroundColor: Theme.wd3,
  },
  darkTextInput: {
    backgroundColor: Theme.wd5,
  },
});
