import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import Card from "../Card";

const IMAGES = [
  {
    name: '"../../../assets/parallax-forest-preview.png"',
    image: require("../../../assets/parallax-forest-preview.png"),
  },
  {
    name: '"central"',
    image: require("../../../assets/central.webp"),
  },
  {
    name: '"../../../assets/parallax-forest-preview.png1"',
    image: require("../../../assets/parallax-forest-preview.png"),
  },
];

const BackgroundTab = () => {
  const setImage = (img: any) => {
    console.log("setImage", img);
    const customize = {
      bg: img,
    };
    AsyncStorage.setItem("customize", JSON.stringify(customize));
  };

  return (
    <View style={styles.bgTab}>
      {IMAGES.map((img) => (
        <TouchableHighlight
          style={styles.touchable}
          key={img.name}
          onPress={() => setImage(img.image)}
        >
          <Card image={img.image} />
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default BackgroundTab;

const styles = StyleSheet.create({
  bgTab: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 12,
  },
  touchable: {
    flex: 1,
    width: "100%",
    padding: 4,
  },
});
