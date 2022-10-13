import { Image, Text } from "@rneui/themed";
import { ImageSourcePropType, StyleSheet, View } from "react-native";

type CardType = {
  image: ImageSourcePropType;
};

const Card = ({ image }: CardType) => {
  return (
    <View style={styles.card}>
      <View style={styles.innerView}>
        <Image style={styles.image} source={image} />
      </View>
      <Text> Teste </Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 100,
    marginBottom: 12,
    marginTop: 12,
    borderRadius: 8,
  },
  innerView: {
    flex: 1,
    alignContent: "center",
    // justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
