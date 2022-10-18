import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "expo-dev-menu";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ImageBackgroundCustom from "../../components/ImageBackgroundCustom";
import PomoBox from "../../components/PomoBox";
import TasksBox from "../../components/TasksBox";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Home", "MyStack">;

const Home = ({ navigation }: Props) => {
  const [charImg, setCharImg] = useState();
  const getCustomize = () => {
    AsyncStorage.getItem("customize").then((res) => {
      const jsonRes = JSON.parse(res || '{bg: ""}');
      setCharImg(jsonRes.char);
    });
  };

  useEffect(() => {
    const unsubscribe: () => void = navigation.addListener("focus", () => {
      getCustomize();

      return unsubscribe;
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageBackgroundCustom navigation={navigation}>
        <ScrollView style={{ width: "100%", flex: 1 }}>
          <View style={styles.topBox}>
            <Image
              style={styles.char}
              source={charImg || require("../../../assets/char/char1.gif")}
            />
          </View>

          <PomoBox navigation={navigation} />

          <TasksBox />
        </ScrollView>

        <StatusBar style="auto" />
      </ImageBackgroundCustom>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  char: {
    height: 150,
    width: 150,
    margin: 25,
    resizeMode: "contain",
  },
  topBox: {
    width: "100%",
    alignItems: "center",
    marginTop: 75,
    flex: 1,
  },
  textBox: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 50,
    height: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
