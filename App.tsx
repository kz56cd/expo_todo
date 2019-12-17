import React from 'react';
// import HUD from 'react-native-progress-hud';
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
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

// var ProgressHUD = require(HUD);

// const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;
const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 60 : StatusBar.currentHeight;

// TODOを保持する key/value Storeのkey
const TODO = '@todoapp.todo'

interface Props {
  todo: { index: number; title: string; done: boolean }[];
  currentIndex: number;
} 

interface State {
  todo: { index: number; title: string; done: boolean }[];
  currentIndex: number;
  inputText: string;
  filterText: string;
  count: number;
}

// functional component( = stateがなくpropのみ備えるコンポーネント) として用意
const TodoItem = (props) => {
  let textStyle = styles.todoItem
  if (props.done == true) {
    textStyle = styles.todoItemDone
  }
  return (
    <TouchableOpacity onPress={props.onTapTodoItem}>
      <Text style={textStyle}>{props.title}</Text>
    </TouchableOpacity> 
  )
}

export default class App extends React.Component<Props, State> {
  
  // life cycle
  
  constructor(props) {
    super(props)
    // // state初期化
    this.state = {
      todo: [],
      currentIndex: 2,
      inputText: '',
      filterText: '',
      count: 0,
    }

    this.onAddItem.bind(this)
  }

  componentDidMount() { // Mountingが全て終了した際に1回だけ呼ばれる
    this.loadTodo()

    // FIXME: ワークアラウンド。flatlist のextraDataが更新されないため、state更新
    this.setState({inputText: 'a'})
    this.setState({inputText: ''})
  }

  shouldComponentUpdate(nextProps, nextState) {
   if (this.state.todo != nextState.todo) {
      return true
    }
    if (this.state.inputText == "" && nextState.inputText == "") {
      return false
    }
    return true
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.filter}>
          {/* <Text>Filterがここに配置されます</Text> */}
        
        
          <TextInput 
            onChangeText={(text) => this.setState({filterText: text})}
            value={this.state.filterText}
            style={styles.inputText}
            placeholder="Type filter text"
          />
        </View>

        {/* リスト */}
        <ScrollView style={styles.todoList}>
          <FlatList data={this.state.todo}
            extraData={this.state.todo} // 指定することで、stateの変更を検知しViewを再描画する
            renderItem={({item}) =>
              <TodoItem
                title={item.title}
                done={item.done}
                onTapTodoItem={() => this.onTapTodoItem(item)}
              />
            }
            // renderItem={({item}) => <Text>{item.title}</Text>}
            keyExtractor={(item, index) => "todo_" + item.index} 
          />
        </ScrollView>

        {/* テキスト入力欄 */}
        <View style={styles.input}>
          <TextInput 
            onChangeText={(text) => this.setState({inputText: text})}
            value={this.state.inputText}
            style={styles.inputText}
            placeholder='Type your todo'
          />
          
          <Button
            onPress={this.onAddItem}
            title="Add"
            color="#841584"
            style={styles.inputButton}
          />

          <Button
            onPress={this.onResetItems}
            title="Reset ALL"
            color="#841584"
            style={styles.inputButton}
          />

        </View>
      </KeyboardAvoidingView>
    );
  }

  // private

  // NOTE: TODOリストへの追加処理
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

    // this.state.todo は渡さない
    //  -> なぜなら、setStateも非同期処理になるため。
    //     必ずしも意図した値を渡せるとは保証できないため、todoをそのまま渡している
    this.saveTodo(todo)
  }

  private onResetItems = () => {
    this.setState({todo: []})
  }

  // AsyncStorageからTODOをロードする
  private loadTodo = async () => {
    try {
      // await は promiseでいうthenのシンタックスシュガー
      const todoString = await AsyncStorage.getItem(TODO)
      if (todoString) {
        const todo = JSON.parse(todoString)
        const currentIndex = todo.length
        this.setState({todo: todo, currentIndex: currentIndex})
      }
    } catch (e) {
      console.log(e)
    }
  }

  private saveTodo = async (todo) => {
    try {
      const todoString =  JSON.stringify(todo)
      await AsyncStorage.setItem(TODO, todoString)
    } catch (e) {
      console.log(e)
    }
  }

  private onTapTodoItem = (todoItem) => {
    const todo = this.state.todo
    const index = todo.indexOf(todoItem)
    todoItem.done = !todoItem.done
    todo[index] = todoItem

    console.log(todo)

    this.setState({todo: todo})
    this.saveTodo(todo)
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
  todoItem: {
    fontSize: 20,
    backgroundColor: 'white',
  },
  todoItemDone: {
    fontSize: 20,
    backgroundColor: 'red',
  },
});
