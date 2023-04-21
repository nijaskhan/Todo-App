import './App.css';
import React, { useState } from 'react';

function App() {
  let [todos, setTodos] = useState([]);
  let [todo, setTodo] = useState('');
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input type="text" onChange={(e)=>{
          setTodo(e.target.value);
          }} placeholder="🖊️ Add item..." />
        <i onClick={()=>{
          setTodos([...todos, {id: Date.now(), text: todo, status: false}]);
        }} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {
          todos.map((obj)=>{
            return(
              <div className="todo">
                <div className="left">
                  <input type="checkbox" onChange={(e)=>{
                    setTodos(todos.filter(Todo=>{
                      if(obj.id===Todo.id){
                        Todo.status=e.target.checked;
                      }
                      return Todo;
                    }));
                  }} value={obj.status} />
                  <p>{obj.text}</p>
                </div>
                <div className="right">
                  <i className="fas fa-times"></i>
                </div>
              </div>
            )
          })
        }
        <div style={{marginTop: '40px'}}>
          <h1>checked Todo`s</h1>
        </div>
        {
          todos.map((obj)=>{
            if(obj.status){
              return(
                <div className="todo">
                  <div className="left">
                    <br/>
                    <p>{obj.text}</p>
                  </div>
                  <div className="right">
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              )
            }
            return null;
          })
        }
      </div>
    </div>
  );
}

export default App;
