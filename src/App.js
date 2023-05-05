import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  let [todos, setTodos] = useState(()=>{
    const saved = JSON.parse(localStorage.getItem('todos'));
    return (saved || "");
  });
  let [todo, setTodo] = useState('');
  let [todoExist, setTodoExist] = useState(false);
  let [todoValidation, setTodoValidation] = useState(false);
  let checkedTodos;
  if(todos){
    checkedTodos = todos.filter((obj) => obj.status);
  }else{
    checkedTodos = false;
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo=()=>{
    let todoExist;
    if(todoExist) todos.some(item => item.text === todo);
    else todoExist=false;
    if(todo.length>1){
      if(todoExist){
        setTodoValidation(false);
        setTodoExist(true);
      }else{
        setTodoExist(false);
        setTodoValidation(false);
        setTodos([...todos, {id: Date.now(), text: todo, status: false}]);
      }
    }else{
      setTodoExist(false);
      setTodoValidation("Please enter a Todo message in the field");
    }
  }
  const handleDeleteTodo=(id)=>{
    const newTodo = todos.filter(obj => obj.id !==id);
    setTodos(newTodo);
  }

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
          <i onClick={()=>handleAddTodo()} 
          className="fas fa-plus"></i>
        </div>
      <p style={{color: 'red', paddingTop: '5px', textAlign: 'center', display: todoExist===false ? 'none' : 'block'}}>Entered todo is already exists</p>
      <p style={{color: 'red', paddingTop: '5px', textAlign: 'center', display: todoValidation ? 'block' : 'none'}}>{todoValidation}</p>
      {/* checkbox checking && redering the todo`s */}
      <div className="todos">
        {
          todos.length>=1 ? (
          todos.map((obj)=>{
            if(!obj.status){
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
                  <i className="fa fa-trash" onClick={()=>handleDeleteTodo(obj.id)}></i>
                </div>
              )
            }
            return null
          }) ):(
            <h2 style={{fontSize: '1rem',paddingTop: '15px', color: 'grey', display: todos.length===0?'block':'none'}}>No Todo`s to show</h2>
          )
        }
        {/* rendering the checked todo`s */}
        {
          checkedTodos.length > 0 ? (
            <div style={{marginTop: '40px', paddingBottom: '10px'}}>
              <h1>Checked Todo's</h1>
              {
                checkedTodos.map((obj) => (
                  <div className="todo">
                    <div className="left">
                      <br />
                      <p style={{textDecoration: 'line-through'}}>{obj.text}</p>
                    </div>
                    <i className="fa fa-trash" onClick={()=>handleDeleteTodo(obj.id)}></i>
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