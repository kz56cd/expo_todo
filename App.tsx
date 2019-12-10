import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  Platform, 
  FlatList,
  ScrollView 
} from 'react-native';

// const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;
const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 60 : StatusBar.currentHeight;

interface Props {
  todo: { index: number; title: string; done: boolean }[];
  currentIndex: number;
} 

interface State {
  todo: { index: number; title: string; done: boolean }[];
  currentIndex: number;
}

// export default function App() {
export default class App extends React.Component<Props, State> {
  
  constructor(props) {
    super(props)
    // // state初期化
    this.state = {
      todo: [
        {index: 1, title: "原稿を書く", done: false},
        {index: 2, title: "犬の散歩をする", done: false}
      ],
      currentIndex: 2
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.filter}>
          <Text>Filterがここに配置されます</Text>
        </View>
        <ScrollView style={styles.todoList}>

          <FlatList data={this.state.todo}
            renderItem={({item}) => <Text>{item.title}</Text>}
            keyExtractor={(item, index) => "todo_" + item.index} 
          />


          <Text>Todoリストがここに配置されます??</Text>
        </ScrollView>
        <View style={styles.input}>
          <Text>テキスト入力がここに配置されます</Text>
        </View>
        <Text>Todo App!</Text>
      </View>
    );
  }
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
