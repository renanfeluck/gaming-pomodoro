import { Button } from "@rneui/base";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type CountdownType = {
  startMinutes: number;
  startSeconds: number;
  onFinish?: () => void;
};
const Countdown = ({ startMinutes, startSeconds, onFinish }: CountdownType) => {
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
      onFinish && onFinish();
      playSound();
    }
    clearInterval(timer);
  }, [seconds, pause]);

  useEffect(() => {
    setMinutes(startMinutes);
    setSeconds(startSeconds);
  }, [startMinutes, startSeconds]);

  return (
    <>
      <View style={styles.counterView}>
        <Text style={styles.counterText}>
          {minutes.toString().padStart(2, "0")} :{" "}
          {seconds.toString().padStart(2, "0")}
        </Text>
      </View>

      {pause ? (
        <View style={styles.buttonView}>
          <Button
            buttonStyle={{
              borderRadius: 5,
              padding: 12,
              height: 50,
              width: 100,
              marginTop: 10,
            }}
            onPress={() => setPause(!pause)}
            title="Start"
          />
        </View>
      ) : (
        <View style={styles.buttonView}>
          <Button
            buttonStyle={{
              borderRadius: 5,
              padding: 12,
              height: 50,
              width: 100,
              marginTop: 10,
            }}
            onPress={reset}
            title="Reset"
            color="error"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  counterView: {
    backgroundColor: "#fff",
    borderRadius: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    marginBottom: 12,
    width: 150,
    height: 150,
  },
  counterText: {
    fontSize: 36,
  },
  buttonView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default Countdown;
