import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

type CountdownType = {
  startMinutes: number;
  startSeconds: number;
};
const Countdown = ({ startMinutes, startSeconds }: CountdownType) => {
  const [seconds, setSeconds] = useState(startSeconds);
  const [minutes, setMinutes] = useState(startMinutes);
  const [timer, setTimer] = useState<NodeJS.Timer>();

  const [sound, setSound] = useState<Audio.Sound>();

  const [pause, setPause] = useState(true);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/monster-4.mp3")
    );

    setSound(sound);

    await sound.playAsync();
  };

  const reset = () => {
    setMinutes(startMinutes);
    setSeconds(startSeconds);
    clearInterval(timer);
    setPause(true);
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (minutes > 0 || seconds > 0) {
      setTimer(
        setInterval(() => {
          console.log("seconds", seconds);
          if (!pause) {
            if (seconds > 0) {
              setSeconds(seconds - 1);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000)
      );
    } else {
      playSound();
    }
    clearInterval(timer);
  }, [seconds, pause]);

  return (
    <>
      <View style={styles.counterView}>
        <Text style={styles.counterText}>
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
      </View>

      {pause ? (
        <Button onPress={() => setPause(!pause)} title="Start" />
      ) : (
        <Button onPress={reset} title="Reset" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  counterView: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    marginBottom: 12,
  },
  counterText: {
    fontSize: 36,
  },
});

export default Countdown;
