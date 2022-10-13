import { Button, Icon, Input, Text } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Tasks } from "../../types/task";
import { generateRnadomId } from "../../utils/generateRandomId";
import TaskBox from "../TaskBox";

const TasksBox = () => {
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

  const onDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

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

  const onCheckTask = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.checked = !task.checked;
      }

      return task;
    });

    setTasks(updatedTasks);
  };

  return (
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
          key={task.id}
        />
      ))}
    </View>
  );
};

export default TasksBox;

const styles = StyleSheet.create({
  tasksBox: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginTop: 36,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tasksTitle: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 12,
    fontStyle: "italic",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  inputView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
