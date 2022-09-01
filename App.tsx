import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from "react-native";
import "expo-dev-menu";
import { Audio } from "expo-av";
import Countdown from "./src/components/Countdown";

export default function App() {
  const [active, setActive] = useState("focus");

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBg}
        source={require("./assets/parallax-forest-preview.png")}
      >
        <View style={styles.pomoBg}>
          <View style={styles.stageSelect}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => setActive("focus")}
            >
              <Text
                style={
                  active === "focus"
                    ? styles.buttonSelected
                    : styles.buttonNotSelected
                }
              >
                Focus
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => setActive("short")}
            >
              <Text
                style={
                  active === "short"
                    ? styles.buttonSelected
                    : styles.buttonNotSelected
                }
              >
                Short Interval
              </Text>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => setActive("long")}
            >
              <Text
                style={
                  active === "long"
                    ? styles.buttonSelected
                    : styles.buttonNotSelected
                }
              >
                Long Interval
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.countdownView}>
            {active === "focus" && (
              <Countdown startMinutes={25} startSeconds={0} />
            )}

            {active === "short" && (
              <Countdown startMinutes={5} startSeconds={0} />
            )}

            {active === "long" && (
              <Countdown startMinutes={15} startSeconds={0} />
            )}
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  imgBg: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pomoBg: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "80%",
    paddingVertical: 36,
    height: 250,
    borderRadius: 12,
  },
  stageSelect: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 100,
    width: "100%",
    marginBottom: 10,
  },
  buttonSelected: {
    fontWeight: "bold",
  },
  buttonNotSelected: {
    fontStyle: "italic",
  },
  countdownView: {
    height: 140,
  },
});
