import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  Platform, 
  FlatList,
  TextInput,
  Button,
  KeyboardAvoidingView,
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
  inputText: string;
}

// export default function App() {
export default class App extends React.Component<Props, State> {
  
  constructor(props) {
    super(props)
    // // state初期化
    this.state = {
      todo: [],
      currentIndex: 2,
      inputText: "",
    }
  }

  // TODOリストへの追加処理
  private onAddItem = () => {
    const title = this.state.inputText
    if (title == "") {
      return
    }

    const index = this.state.currentIndex + 1
    const newTodo = {index: index, title: title, done: false}
    const todo = [...this.state.todo, newTodo]
    this.setState({
      todo: todo,
      currentIndex: index,
      inputText: ""
    })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.filter}>
          <Text>Filterがここに配置されます</Text>
        </View>

        {/* リスト */}
        <ScrollView style={styles.todoList}>
          <FlatList data={this.state.todo}
            renderItem={({item}) => <Text>{item.title}</Text>}
            keyExtractor={(item, index) => "todo_" + item.index} 
          />
        </ScrollView>

        {/* テキスト入力欄 */}
        <View style={styles.input}>
          <TextInput 
            onChangeText={(text) => this.setState({inputText: text})}
            value={this.state.inputText}
            style={styles.inputText}
          />
          
          <Button
            onPress={this.onAddItem}
            title="Add"
            color="#841584"
            style={styles.inputButton}
          />

        </View>
      </KeyboardAvoidingView>
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
    height: 30,
  },
  todoList: {
    flex: 1,
  },
  input: {
    height: 30,
    flexDirection: 'row',
    marginBottom: 60,
  },
  inputText: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginLeft: 10,
  },
  inputButton: {
    width: 100,
  },
});
