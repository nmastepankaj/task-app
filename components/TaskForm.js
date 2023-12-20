import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { Priority } from "../Utils/enums";
import { getTodayDate, getTomorrowDate, isDateValid } from "../Utils/helperFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { dataFormat } from "../Utils/enums";

const TaskForm = ({ setTasks, tasks, isUpdate, data, setData, setModalVisible}) => {
  const [taskName, setTaskName] = useState(data.name);
  const [taskDeadline, setTaskDeadline] = useState(data.deadline);
  const [taskPriority, setTaskPriority] = useState(data.priority);

  const storeData = async () => {
    if (!taskName || !taskDeadline || !taskPriority) {
      alert("Please fill all the fields");
      return;
    }
    if(!isDateValid(taskDeadline)){
     alert("Please enter valid date");
     return;   
    }
    
    if(!data.id){
        const newTask = {
          id: Math.random().toString(),
          name: taskName,
          deadline: taskDeadline,
          priority: taskPriority,
          isCompleted: false,
          dateCreated: getTodayDate(),
        };
        try {
            let allTasks = tasks;
          allTasks.push(newTask);
          const jsonValue = JSON.stringify(allTasks);
          setTasks(allTasks);
          await AsyncStorage.setItem("tasks", jsonValue);
          setModalVisible(true);
          setModalVisible(false);
          setTaskName("");
          setTaskDeadline("");
          setTaskPriority("");
          setData(dataFormat);
          alert("Task added successfully");
        } catch (e) {
            alert("error while adding task");
        }
    }else{
        const newTask = {
          id: data.id,
          name: taskName,
          deadline: taskDeadline,
          priority: taskPriority,
          isCompleted: false,
        };
        try {
        //   let allTasks = tasks;
        //   allTasks = allTasks.filter((task) => task.id !== data.id);
        const updatedTasks = tasks.map((task) => {
                if (task.id === data.id) {
                  return {
                    ...task,
                    name: taskName,
                    deadline: taskDeadline,
                    priority: taskPriority,
                  };
                }
                return task;
              });
          setTasks(updatedTasks);
          const jsonValue = JSON.stringify(updatedTasks);
          await AsyncStorage.setItem("tasks", jsonValue);
          setTaskName("");
          setTaskDeadline("");
          setTaskPriority("");
          setModalVisible(false);
          setData(dataFormat);
        } catch (e) {
            alert("error while updating task");
        }
    }
  };


  return (
    <View style={styles.curvedTopBox}>
      <View style={styles.textBox}>
        <TextInput
          style={styles.input}
          placeholder="Task Name"
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
        />
      </View>

      <View style={styles.priorityTabBox}>
        <Pressable
          style={[
            styles.priorityTab,
            {
              backgroundColor:
                taskPriority === Priority.HIGH ? "#ff3131" : "#fff",
            },
          ]}
          onPress={() => setTaskPriority(Priority.HIGH)}
        >
          <Text style={taskPriority === Priority.HIGH ? styles.textWhite : styles.priorityHigh}>High</Text>
        </Pressable>
        <Pressable
          style={[
            styles.priorityTab,
            {
              backgroundColor:
                taskPriority === Priority.MEDIUM ? "#ff914d" : "#fff",
            },
          ]}
          onPress={() => setTaskPriority(Priority.MEDIUM)}
        >
          <Text style={taskPriority === Priority.MEDIUM ? styles.textWhite : styles.priorityMedium}>Medium</Text>
        </Pressable>
        <Pressable
          style={[
            styles.priorityTab,
            {
              backgroundColor:
                taskPriority === Priority.LOW ? "#00bf63" : "#fff",
            },
          ]}
          onPress={() => setTaskPriority(Priority.LOW)}
        >
          <Text style={taskPriority === Priority.LOW ? styles.textWhite : styles.priorityLow}>Low</Text>
        </Pressable>
      </View>

      <View style={styles.deadlineBox}>
        <View>
          <Text style={styles.deadlineText}>Deadline</Text>
        </View>
        <View style={styles.dateTab}>
          <TextInput
            style={styles.dateText}
            placeholder="dd/mm/yyyy"
            value={taskDeadline}
            onChangeText={(text) => setTaskDeadline(text)}
          />
        </View>
        <View style={styles.deadlineTabBox}>
          <Pressable
            style={styles.deadlineTab}
            onPress={() => setTaskDeadline(getTodayDate())}
          >
            <Text style={styles.deadlineTabText}>Today</Text>
          </Pressable>
          <Pressable
            style={styles.deadlineTab}
            onPress={() => setTaskDeadline(getTomorrowDate())}
          >
            <Text style={styles.deadlineTabText}>Tommorrow</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={storeData} style={styles.buttonStyle}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{isUpdate? "Update Task" : "Add Task"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  curvedTopBox: {
    height: 300,
    backgroundColor: "#6d63ff",
    width: "100%",
    paddingTop: Platform.OS === "android" ? 20 : 0,
    paddingHorizontal: 20,
  },

  textBox: {
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  input: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
  },

  // Priority Box Styles

  priorityTabBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    // columnGap: 20,
  },
  priorityTab: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 30,
  },
  priorityHigh: {
    color: "#ff3131",
  },
  priorityMedium: {
    color: "#ff914d",
  },
  priorityLow: {
    color: "#00bf63",
  },
  textWhite: {
    color: '#fff',
  },
  deadlineBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  deadlineText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  dateTab: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 30,
    justifyContent: "center",
    height: 40,
  },
  dateText: {
    color: "#bbb",
    fontSize: 16,
  },
  deadlineTabBox: {
    rowGap: 5,
  },
  deadlineTab: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  deadlineTabText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f7fc",
    borderRadius: 5,
    padding: 10,
  },
});

export default TaskForm;
