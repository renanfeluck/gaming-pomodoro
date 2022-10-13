import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import "expo-dev-menu";

import Home from "./src/screens/Home";
import Settings from "./src/screens/Settings";

import { Ionicons } from "@expo/vector-icons";
import Customize from "./src/screens/Customize";

export default function App() {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Customize"
          component={Customize}
          options={{
            tabBarIcon: () => (
              <Ionicons name="brush-outline" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: () => <Ionicons name="home" size={24} color="black" />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: () => (
              <Ionicons name="settings" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
