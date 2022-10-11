import { Text } from "@rneui/base";
import { Button, Dialog, Input } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import { SettingsType } from "../../types/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Settings", "MyStack">;

const Settings = ({ navigation }: Props) => {
  const [settings, setSettings] = useState<SettingsType>({
    intervals: 3,
    pomodoro: 25,
    shortRest: 5,
    longRest: 25,
  });

  const [dialog, setDialog] = useState(false);
  const [dialogError, setDialogError] = useState(false);

  const onChangeValue = (value: string, field: keyof SettingsType) => {
    setSettings({
      ...settings,
      [field]: parseInt(value.replace(/[^0-9]/g, "")) || 0,
    });
  };

  const storeData = async (value: SettingsType) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("settings", jsonValue);
      setDialog(true);
    } catch (e) {
      setDialogError(true);
    }
  };

  const onDialogClose = () => {
    setDialog(false);
    navigation.navigate("Home");
  };

  return (
    <View>
      <Input
        onChangeText={(value) => onChangeValue(value, "pomodoro")}
        value={settings.pomodoro.toString()}
        keyboardType="numeric"
        label="Pomodoro Timer"
      />

      <Input
        onChangeText={(value) => onChangeValue(value, "shortRest")}
        value={settings.shortRest.toString()}
        keyboardType="numeric"
        label="Short Rest"
      />

      <Input
        onChangeText={(value) => onChangeValue(value, "longRest")}
        value={settings.longRest.toString()}
        keyboardType="numeric"
        label="Long Rest"
      />

      <Input
        onChangeText={(value) => onChangeValue(value, "intervals")}
        value={settings.intervals.toString()}
        keyboardType="numeric"
        label="Number of short rests before long rest"
      />

      <Button onPress={() => storeData(settings)}>Save Settings</Button>

      <Dialog isVisible={dialog} onBackdropPress={onDialogClose}>
        <Dialog.Title title="Settings Saved" />
        <Text>Your settings have been saved successfully</Text>
      </Dialog>

      <Dialog
        isVisible={dialogError}
        onBackdropPress={() => setDialogError(false)}
      >
        <Dialog.Title title="Error" />
        <Text>Something went wrong. Try again later</Text>
      </Dialog>
    </View>
  );
};

export default Settings;
