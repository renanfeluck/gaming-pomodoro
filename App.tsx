import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import "expo-dev-menu";

export default function App() {
  const [seconds, setSeconds] = useState(5);
  const [minutes, setMinutes] = useState(1);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const reset = () => {
    setMinutes(1);
    setSeconds(5);
    clearInterval(timer);
  };

  useEffect(() => {
    console.log("timer", timer);
    if (minutes > 0 || seconds > 0) {
      setTimer(
        setInterval(() => {
          console.log("seconds", seconds);

          if (seconds > 0) {
            setSeconds(seconds - 1);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }, 1000)
      );
    }
    clearInterval(timer);
  }, [seconds]);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBg}
        source={require("./assets/parallax-forest-preview.png")}
      >
        <View style={styles.counterView}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <Text>
            {minutes.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}{" "}
            :{" "}
            {seconds.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </Text>
          <Button onPress={reset} title="reset" />
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
  counterView: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 12,
  },
});
