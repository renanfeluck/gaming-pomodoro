import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableHighlight, View } from "react-native";
import Card from "../Card";
import { IMAGES } from "./constants";

type BackgroundTabType = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Customize",
    "MyStack"
  >;
};

const BackgroundTab = ({ navigation }: BackgroundTabType) => {
  const [bg, setBg] = useState<any>();
  const [customize, setCustomize] = useState<any>();

  const getCustomize = () => {
    AsyncStorage.getItem("customize").then((res) => {
      const jsonRes = JSON.parse(res || '{bg: ""}');
      setBg(jsonRes.bg);
      setCustomize(jsonRes);
    });
  };

  useEffect(() => {
    const unsubscribe: () => void = navigation.addListener("focus", () => {
      getCustomize();

      return unsubscribe;
    });
  }, [navigation]);

  const setImage = (img: any) => {
    setBg(img);
    const newCustomize = {
      ...customize,
      bg: img,
    };
    AsyncStorage.setItem("customize", JSON.stringify(newCustomize));
  };

  return (
    <ScrollView>
      <View style={styles.bgTab}>
        {IMAGES.map((img) => (
          <TouchableHighlight
            style={styles.touchable}
            key={img.name}
            onPress={() => setImage(img.image)}
          >
            <Card image={img.image} checked={bg === img.image} />
          </TouchableHighlight>
        ))}
      </View>
    </ScrollView>
  );
};

export default BackgroundTab;

const styles = StyleSheet.create({
  bgTab: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    padding: 12,
  },
  touchable: {
    width: "33%",
    padding: 4,
  },
});
