import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import "expo-dev-menu";
import Countdown from "./src/components/Countdown";
import TaskBox from "./src/components/TaskBox";
import { Tasks } from "./src/types/task";
import { generateRnadomId } from "./src/utils/generateRandomId";
import { Button, Divider, Icon, Input } from "@rneui/base";

export default function App() {
  const [active, setActive] = useState("focus");
  const [inputAdd, setInputAdd] = useState("");

  const [tasks, setTasks] = useState<Tasks>([
    {
      id: generateRnadomId(),
      name: "Teste 1",
      checked: true,
    },
    {
      id: generateRnadomId(),
      name: "Teste 2",
      checked: false,
    },
  ]);

  const onCheckTask = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.checked = !task.checked;
      }

      return task;
    });

    console.log(updatedTasks);
    setTasks(updatedTasks);
  };

  const onDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    console.log(updatedTasks);
    setTasks(updatedTasks || []);
  };

  const onAddTask = () => {
    if (inputAdd !== "") {
      const newTasks = [
        {
          id: generateRnadomId(),
          name: inputAdd,
          checked: false,
        },
        ...tasks,
      ];

      setTasks(newTasks);
      setInputAdd("");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imgBg}
        source={require("./assets/parallax-forest-preview.png")}
      >
        <ScrollView style={{ width: "100%", flex: 1 }}>
          <View style={styles.topBox}>
            <View style={styles.textBox}>
              <Text
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
                Time to focus...
              </Text>
            </View>
            <Image style={styles.char} source={require("./assets/hood.gif")} />
          </View>

          <View style={styles.pomoBox}>
            <View style={styles.pomoBg}>
              <View style={styles.stageSelect}>
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => setActive("focus")}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={
                      active === "focus"
                        ? styles.buttonSelected
                        : styles.buttonNotSelected
                    }
                  >
                    Focus
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => setActive("short")}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={
                      active === "short"
                        ? styles.buttonSelected
                        : styles.buttonNotSelected
                    }
                  >
                    Short Interval
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => setActive("long")}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={
                      active === "long"
                        ? styles.buttonSelected
                        : styles.buttonNotSelected
                    }
                  >
                    Long Interval
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.countdownView}>
                {active === "focus" && (
                  <Countdown startMinutes={25} startSeconds={0} />
                )}

                {active === "short" && (
                  <Countdown startMinutes={5} startSeconds={0} />
                )}

                {active === "long" && (
                  <Countdown startMinutes={15} startSeconds={0} />
                )}
              </View>
            </View>
          </View>

          <View style={styles.tasksBox}>
            <Text style={styles.tasksTitle}> Tasks </Text>

            <View style={styles.inputView}>
              <View style={{ width: "80%" }}>
                <Input
                  placeholder="Add Task"
                  value={inputAdd}
                  onChangeText={(text) => setInputAdd(text)}
                  onSubmitEditing={onAddTask}
                  inputStyle={{ width: 80 }}
                />
              </View>
              <Button onPress={onAddTask} type="clear">
                <Icon name="plus" type="entypo" />
              </Button>
            </View>

            {tasks.map((task) => (
              <TaskBox
                task={task}
                onCheckTask={onCheckTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
          </View>
        </ScrollView>

        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  imgBg: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pomoBg: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "80%",
    paddingVertical: 36,
    height: 250,
    borderRadius: 12,
  },
  stageSelect: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 100,
    width: "100%",
    marginBottom: 10,
  },
  buttonSelected: {
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonNotSelected: {
    fontStyle: "italic",
    textAlign: "center",
  },
  countdownView: {
    height: 140,
  },
  char: {
    height: 150,
    width: 150,
    margin: 25,
  },
  topBox: {
    width: "100%",
    alignItems: "center",
    marginTop: 75,
    flex: 1,
  },
  textBox: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 50,
    height: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pomoBox: {
    flex: 1,
    alignItems: "center",
  },
  tasksBox: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginTop: 36,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  inputView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  tasksTitle: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 12,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
