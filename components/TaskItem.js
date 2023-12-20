import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Priority } from "../Utils/enums";
import { MaterialIcons } from "@expo/vector-icons";
import { getDateDescription } from "../Utils/helperFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TaskItem = ({ data, setTasks, tasks, setModalVisible, setData }) => {
  const setFormData = (data) => {
    setData(data);
    setModalVisible(true);
  };

  const deleteTask = async (id) => {
    try {
      tasks = tasks.filter((task) => task.id !== id);
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonValue);
      setTasks(tasks);
    } catch (e) {
      alert("error while deleting task");
      console.log("error while deleting task");
    }
  };

  const updateTask = async (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    const jsonValue = JSON.stringify(updatedTasks);
    await AsyncStorage.setItem("tasks", jsonValue);
  };

  return (
    <View style={styles.taskBox}>
      <Pressable style={styles.tick} onPress={() => updateTask(data.id)}>
        {data.isCompleted && (
          <MaterialIcons name="done" size={20} color="black" />
        )}
      </Pressable>
      <View style={styles.sideBox}>
        <View style={styles.taskTopBox}>
          <Text
            style={[
              styles.taskText,
              data.isCompleted ? { textDecorationLine: "line-through" } : {},
            ]}
          >
            {data?.name}
          </Text>
        </View>
        <View style={styles.taskBottomBox}>
          <View
            style={[
              styles.taskItemTab,
              data.priority === Priority.HIGH
                ? styles.priorityHigh
                : data.priority === Priority.MEDIUM
                ? styles.priorityMedium
                : styles.priorityLow,
            ]}
          >
            <Text
              style={[
                styles.taskItemTabText,
                data.priority === Priority.HIGH
                  ? styles.priorityHigh
                  : data.priority === Priority.MEDIUM
                  ? styles.priorityMedium
                  : styles.priorityLow,
              ]}
            >
              {data.priority}
            </Text>
          </View>
          <View style={styles.taskItemTab}>
            <Text style={styles.taskItemTabText}>
              {getDateDescription(data.deadline)}
            </Text>
          </View>
          <Pressable
            style={[styles.taskItemTab, { flexDirection: "row", columnGap: 3 }]}
            onPress={() => setFormData(data)}
          >
            <MaterialIcons name="edit" size={12} color="black" />
            <Text style={styles.taskItemTabText}>Edit</Text>
          </Pressable>
          <Pressable
            style={[styles.taskItemTab, { flexDirection: "row", columnGap: 3 }]}
            onPress={() => deleteTask(data.id)}
          >
            <MaterialIcons name="delete" size={12} color="black" />
            <Text style={styles.taskItemTabText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskBox: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
    sideBox: {
        flex: 1,
        marginLeft: 10,
    },
  taskTopBox: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  tick: {
    width: 25,
    height: 25,
    borderWidth: 2,
  },
  taskText: {
    fontSize: 16,
  },
  taskBottomBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
    columnGap: 6,
  },
  taskItemTab: {
    // backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    borderWidth: 1,
  },
  taskItemTabText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  priorityHigh: {
    color: "#ff3131",
    borderColor: "#ff3131",
  },
  priorityMedium: {
    color: "#ff914d",
    borderColor: "#ff914d",
  },
  priorityLow: {
    color: "#00bf63",
    borderColor: "#00bf63",
  },
});

export default TaskItem;
