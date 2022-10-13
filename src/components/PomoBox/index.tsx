import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { SettingsType } from "../../types/settings";
import Countdown from "../Countdown";

type PomoBoxType = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home", "MyStack">;
};
const PomoBox = ({ navigation }: PomoBoxType) => {
  const [active, setActive] = useState("focus");
  const [settings, setSettings] = useState<SettingsType | null>(null);
  const [intervalCount, setIntervalCount] = useState(3);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("settings");
      if (value !== null) {
        const jsonSettings = JSON.parse(value);
        setSettings(jsonSettings);
        setIntervalCount(jsonSettings.intervals);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe: () => void = navigation.addListener("focus", () => {
      getData();

      return unsubscribe;
    });
  }, [navigation]);

  const onFinishFocus = () => {
    if (intervalCount > 0) {
      setIntervalCount(intervalCount - 1);
      setActive("short");
    } else {
      setIntervalCount(settings?.intervals || 3);
      setActive("long");
    }
  };

  const onFinishRest = () => {
    setActive("focus");
  };

  return (
    <>
      <View style={styles.pomoBox}>
        <View style={styles.pomoBg}>
          <View style={styles.stageSelect}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              onPress={() => setActive("focus")}
              style={{ flex: 1 }}
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
              style={{ flex: 1 }}
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
              style={{ flex: 1 }}
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
              <Countdown
                startMinutes={settings?.pomodoro || 25}
                startSeconds={0}
                onFinish={onFinishFocus}
              />
            )}

            {active === "short" && (
              <Countdown
                startMinutes={settings?.shortRest || 5}
                startSeconds={0}
                onFinish={onFinishRest}
              />
            )}

            {active === "long" && (
              <Countdown
                startMinutes={settings?.longRest || 15}
                startSeconds={0}
                onFinish={onFinishRest}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default PomoBox;

const styles = StyleSheet.create({
  pomoBox: {
    flex: 1,
    alignItems: "center",
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
    textAlign: "center",
  },
  buttonNotSelected: {
    fontStyle: "italic",
    textAlign: "center",
  },
  countdownView: {
    height: 140,
  },
});
