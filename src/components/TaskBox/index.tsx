import { Button, CheckBox, Dialog, Icon, Text } from "@rneui/base";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Task } from "../../types/task";

type TaskBoxType = {
  task: Task;
  onCheckTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

const TaskBox = ({ task, onCheckTask, onDeleteTask }: TaskBoxType) => {
  const [visible, setVisible] = useState(false);

  const deleteTask = () => {
    onDeleteTask(task.id);
    setVisible(false);
  };

  const cancel = () => {
    console.log("cancel");
    setVisible(false);
  };

  return (
    <View style={styles.taskBox} key={task.id}>
      <CheckBox
        center
        title={task.name}
        checked={task.checked}
        onPress={() => onCheckTask(task.id)}
      />
      <Button onPress={() => setVisible(true)} type="clear">
        <Icon name="trash" type="entypo" />
      </Button>

      <Dialog
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={styles.dialog}
      >
        <Dialog.Title title="Delete Task" />
        <Text>Are you sure want to delete this task?</Text>
        <Dialog.Actions>
          <Dialog.Button title="Delete" onPress={deleteTask} />
          <Dialog.Button title="Cancel" onPress={cancel} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  taskBox: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    borderRadius: 10,
    width: "95%",
  },
  dialog: {
    backgroundColor: "#fff",
  },
});

export default TaskBox;
