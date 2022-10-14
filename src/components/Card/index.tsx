import { Image } from "@rneui/themed";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CardType = {
  image: ImageSourcePropType;
  checked?: boolean;
};

const Card = ({ image, checked = false }: CardType) => {
  return (
    <View style={[styles.card, checked && styles.cardChecked]}>
      <View style={styles.innerView}>
        <Image style={styles.image} source={image} />
        {checked && (
          <Ionicons
            style={styles.checkIcon}
            name="checkmark-circle"
            size={24}
            color="white"
          />
        )}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    height: 100,
    width: "100%",
    marginBottom: 12,
    marginTop: 12,
    borderRadius: 8,
  },
  cardChecked: {
    borderWidth: 3,
    borderColor: "black",
  },
  innerView: {
    flex: 1,
    alignContent: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  checkIcon: {
    top: 2,
    right: 2,
    position: "absolute",
  },
});
