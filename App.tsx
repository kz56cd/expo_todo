import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  Platform, 
  ScrollView 
} from 'react-native';

// const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;
const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 60 : StatusBar.currentHeight;

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Text>Filterがここに配置されます</Text>
      </View>
      <ScrollView style={styles.todoList}>
        <Text>Todoリストがここに配置されます</Text>
      </ScrollView>
      <View style={styles.input}>
        <Text>テキスト入力がここに配置されます</Text>
      </View>
      <Text>Todo App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: STATUSBAR_HEIGHT,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  filter: {
    height: 30
  },
  todoList: {
    flex: 1
  },
  input: {
    height: 30
  }
});
