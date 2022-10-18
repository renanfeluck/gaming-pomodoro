import { Image } from "@rneui/themed";
import {
  ImageResizeMode,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type CardType = {
  image: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  checked?: boolean;
};

const Card = ({ image, resizeMode = "cover", checked = false }: CardType) => {
  return (
    <View style={styles.card}>
      <View style={styles.innerView}>
        <Image
          style={[
            styles.image,
            checked && styles.cardChecked,
            { resizeMode: resizeMode },
          ]}
          source={image}
        />
        {checked && (
          <Ionicons
            style={styles.checkIcon}
            name="checkmark-circle"
            size={24}
            color="white"
          />
        )}
        {/* </ImageBackground> */}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
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
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    borderColor: "gray",
    borderWidth: 2,
  },
  checkIcon: {
    top: 2,
    right: 8,
    position: "absolute",
  },
});
