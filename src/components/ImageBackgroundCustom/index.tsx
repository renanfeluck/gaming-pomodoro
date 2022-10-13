import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReactNode, useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";

type ImageBackgroundCustomType = {
  children: ReactNode;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home", "MyStack">;
};
const ImageBackgroundCustom = ({
  children,
  navigation,
}: ImageBackgroundCustomType) => {
  const [bg, setBg] = useState<any>();

  const getCustomize = () => {
    AsyncStorage.getItem("customize").then((res) => {
      const jsonRes = JSON.parse(res || '{bg: ""}');
      setBg(jsonRes.bg);
    });
  };

  useEffect(() => {
    const unsubscribe: () => void = navigation.addListener("focus", () => {
      getCustomize();

      return unsubscribe;
    });
  }, [navigation]);

  return (
    <ImageBackground style={styles.imgBg} source={bg}>
      {children}
    </ImageBackground>
  );
};

export default ImageBackgroundCustom;

const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
