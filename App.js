// import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  StatusBar,
  ImageBackground,
  Modal,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataFormat } from "./Utils/enums";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState(dataFormat);
  
  const [modalVisible, setModalVisible] = useState(false);
  
  
  const getDataFromAsyncStorage = async () => {
    try {
        const value = await AsyncStorage.getItem("tasks");
        console.log({ value: value });
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log("error while getting tasks");
      }
      return "[]";
    };

    

    useEffect(() => {
      const asyncAction = async () => {
        try {
          let data = await getDataFromAsyncStorage();
          // setIsError(false);
          console.log({ data: data });
          data = JSON.parse(data);
          setTasks(data);
        } catch (e) {
          console.log("error while getting tasks");
          // setIsError(true);
        }
      }
      asyncAction();
    }, []);
    
    
  //   const editTask = (taskId, newName, newDeadline, newPriority) => {
  //   const updatedTasks = tasks.map((task) => {
  //     if (task.id === taskId) {
  //       return {
  //         ...task,
  //         name: newName,
  //         deadline: newDeadline,
  //         priority: newPriority,
  //       };
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTasks);
  // };

  // const removeTask = (taskId) => {
  //   const updatedTasks = tasks.filter((task) => task.id !== taskId);
  //   setTasks(updatedTasks);
  // };
  // console.log({ modalVisible });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#6d63ff" barStyle="light-content" />
        <TaskForm setTasks={setTasks} tasks={tasks} isUpdate={false} data={formData} setData={setFormData} setModalVisible={setModalVisible}/>
        {/* <Button title="Get Data" onPress={getData}/> */}
        <View style={styles.curvedShape}></View>

        <View style={styles.taskBox}>
          {/* {tasks.map((task) => (
            <TaskItem key={task.id} data={task} setTasks={setTasks} tasks={tasks} setModalVisible={setModalVisible} setData={setFormData}/>
          ))} */}
          <FlatList
            data={tasks}
            renderItem={({ item, index }) => {
              return <TaskItem key={index} data={item} setTasks={setTasks} tasks={tasks} setModalVisible={setModalVisible} setData={setFormData}/>;
            }}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={
              <View
                style={{
                  height: 16,
                }}
              />
            }
            ListEmptyComponent={<Text>No Items Found</Text>}
            // ListHeaderComponent={
            //   <Text style={styles.headerText}>Pokemon List</Text>
            // }
            // ListFooterComponent={
            //   <Text style={styles.footerText}>End of list</Text>
            // }
            // horizontal={true}
          />
        </View>   

        
      </ScrollView>


      {/* Model For Updating Task */}

        <Modal
          animationType="fade-in"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setFormData(dataFormat);
          }}
        >
          <Pressable style={styles.backdrop} onPress={() => {
            setModalVisible(false);
            setFormData(dataFormat);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TaskForm setTasks={setTasks} tasks={tasks} isUpdate={true} data={formData} setData={setFormData} setModalVisible={setModalVisible}/>
            </View>
          </View>
          </Pressable>
        </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? 20 : 0,
    backgroundColor: "#f6f7fc",
  },
  curvedShape: {
    height: 50,
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
    backgroundColor: "#6d63ff",
    width: "100%",
  },

  taskBox: {
    marginTop: 50,
    marginBottom: 50,
    paddingHorizontal: 20,
  },


  // Model UI 
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
