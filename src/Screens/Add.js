//Home Screen, Building Page, Functionality of Todo in elements/Todo
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  ImageBackground,
  str,
} from 'react-native';

import GlobalStyle from '../GlobalStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firestore from '@react-native-firebase/firestore';
import Todo2 from '../Elements/Todo2';

export default function Done() {
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');

  const [today, setToday] = useState(true);
  const [tommorrow, setTommorrow] = useState(false);
  const [someday, setSomeday] = useState(false);

  const taskToday = () => {
    setToday(true);
    setTommorrow(false);
    setSomeday(false);
  };

  const taskTommorrow = () => {
    setToday(false);
    setTommorrow(true);
    setSomeday(false);
  };
  const taskSomeday = () => {
    setToday(false);
    setTommorrow(false);
    setSomeday(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/back.png')}
      style={styles.body}>
      <View style={styles.body}>
        {/* ToDo Elements in a flat list, actual element in todo.js  */}
        <View style={styles.listaBe}>
          <FlatList
            style={styles.flatList}
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Todo2
                title={item.title}
                id={item.id}
                elFunction={() => toggleComplete(item.id, item.complete)}
                elIcon={'check'}
              />
            )}
          />
        </View>

        {/* Add to do modal */}

        <View style={styles.modal}>
          <View style={styles.modalWrapper}>
            <TextInput
              style={styles.modalTitle}
              placeholder="Task title"
              value={todo}
              onChangeText={setTodo}></TextInput>
            <TextInput
              style={styles.modalDescription}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}></TextInput>

            <View style={styles.modalWrapperTimeButtons}>
              <TouchableOpacity
                style={[today ? styles.btnClicked : styles.btnUnclicked]}
                onPress={taskToday}>
                <Text style={styles.modalTextTimeButtons}>Today</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[tommorrow ? styles.btnClicked : styles.btnUnclicked]}
                onPress={taskTommorrow}>
                <Text>Tommorrow</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[someday ? styles.btnClicked : styles.btnUnclicked]}
                onPress={taskSomeday}>
                <Text>Someday</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalWrapperCreateCancel}>
              <TouchableOpacity
                style={styles.modalBtnCreateCancel}
                onPress={() => SetAddMenu(false)}>
                <Text style={styles.modalBtnTextCreateCancel}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={todo.length === 0}
                style={styles.modalBtnCreateCancel}
                onPress={addTodo}>
                <Text style={styles.modalBtnTextCreateCancel}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <Text style={[GlobalStyle.CustomFont, styles.text]}>Home</Text> */}

        {/* bulb button */}
        <TouchableOpacity style={styles.addBtn} onPress={onPressHandler}>
          <FontAwesome5 name={'lightbulb'} size={30} color={'#FECA8C'} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Thin',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#636363',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    elevation: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
  },
  modalWrapper: {
    width: '90%',
    backgroundColor: '#3b3c3d',
    borderRadius: 7,
    margin: 10,
  },
  modalTitle: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    fontSize: 20,
    backgroundColor: 'grey',
    elevation: 5,
  },
  modalDescription: {
    height: 150,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 7,
    margin: 10,
    fontSize: 12,
    backgroundColor: 'grey',
    elevation: 5,
  },

  modalBtnCreateCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 3,
    height: 30,
    paddingLeft: 30,
    paddingRight: 30,
    margin: 10,
  },

  modalBtnTextCreateCancel: {
    fontFamily: 'Poppins-SemiBold',
  },

  modalWrapperCreateCancel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalWrapperTimeButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnClicked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FECA8C',
    borderRadius: 3,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },

  btnUnclicked: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 3,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
});
