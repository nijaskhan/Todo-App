import './App.css';
import React, { useState } from 'react';

function App() {
  let [todos, setTodos] = useState([]);
  let [todo, setTodo] = useState('');

  const checkedTodos = todos.filter((obj) => obj.status);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's a Sunny Day 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input type="text" onChange={(e)=>{
          setTodo(e.target.value);
          }} placeholder="🖊️ Add item..." />
        <i onClick={()=>{
          setTodos([...todos, {id: Date.now(), text: todo, status: false}]);
        }} 
        className="fas fa-plus"></i>
      </div>
      {/* checkbox checking && redering the todo`s */}
      <div className="todos">
        {
          todos.map((obj)=>{
            return(
              <div className="todo">
                <div className="left">
                  <input type="checkbox" onChange={(e)=>{
                    setTodos(todos.map(Todo=>{
                      if(obj.id===Todo.id){
                        Todo.status=e.target.checked;
                      }
                      return Todo;
                    }));
                  }} checked={obj.status} />
                  <p>{obj.text}</p>
                </div>
              </div>
            )
          })
        }
        {/* rendering the checked todo`s */}
        {
          checkedTodos.length > 0 ? (
            <div style={{marginTop: '40px'}}>
              <h1>Checked Todo's</h1>
              {
                checkedTodos.map((obj) => (
                  <div className="todo">
                    <div className="left">
                      <br />
                      <p>{obj.text}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <div style={{marginTop: '40px'}}>
              <h1>No Checked Todo's</h1>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
