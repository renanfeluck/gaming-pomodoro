import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Card from "components/Card";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { IMAGES } from "./constants";

type CharTabType = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Customize",
    "MyStack"
  >;
};
function CharTab({ navigation }: CharTabType) {
  const [customize, setCustomize] = useState<any>();
  const [char, setChar] = useState<any>();

  const getCustomize = () => {
    AsyncStorage.getItem("customize").then((res) => {
      const jsonRes = JSON.parse(res || '{bg: ""}');
      setChar(jsonRes.char);
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
    setChar(img);
    const newCustomize = {
      ...customize,
      char: img,
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
            <Card
              image={img.image}
              checked={img.image === char}
              resizeMode="contain"
            />
          </TouchableHighlight>
        ))}
        <Text>{char?.name}</Text>
      </View>
    </ScrollView>
  );
}

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

export default CharTab;
