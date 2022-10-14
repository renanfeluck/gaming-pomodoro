import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Tab, Text, TabView } from "@rneui/themed";
import { useState } from "react";
import BackgroundTab from "components/BackgroundTab";
import CharTab from "components/CharTab";

type CustomizeType = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Customize",
    "MyStack"
  >;
};

const Customize = ({ navigation }: CustomizeType) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Tab
        value={index || 0}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Background"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "timer", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Character"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "heart", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Sound"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "cart", type: "ionicon", color: "white" }}
        />
      </Tab>

      <TabView value={index || 0} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: "100%" }}>
          <BackgroundTab navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "blue", width: "100%" }}>
          <CharTab />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: "green", width: "100%" }}>
          <Text h1>Sound</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default Customize;
