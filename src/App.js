import styled from "styled-components";
import { myTodos } from "./data/todos";
import { useState } from "react";
import List from "./Components/List";
import uuid from 'react-uuid';
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useThemeContext } from "./context/themeContexts";

function App() {

  const [todos, setTodos] = useState(myTodos);
  const [value, setValue] = useState("");

  const theme = useThemeContext();

  // Set the new value of the input to the value state

  const handleChanges = (e) => {
    setValue(e.target.value);
  }

  // Handle the submit action: add a new todo to the todos list

  const handleSubmit = (e) => {
    e.preventDefault()

    if (value.length < 3 || !value) {
      return alert("Name of the task should be longer !!")
    }

    const newTodos = [...todos, {
      id: uuid(),
      name: value,
      completed: false
    }]

    setTodos(newTodos)
    setValue('')
  }

  // remove the task
  const handleRemove = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.id !== id;
    })

    setTodos(filtered);
  }

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        // create the new array of List
        const newItems = [...items]

        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, items[oldIndex]);

        return newItems;
      })
    }
  }

  return (
    <>
      <AppStyled className="App" theme={theme}>
        <form action="" className="form" onSubmit={handleSubmit}>
          <h1>Today task</h1>
          <div className="input-container">
            <input type="text" placeholder="Add a task" value={value} onChange={handleChanges} />
            <div className="submit-btn">
              <button>+ Add</button>
            </div>
          </div>
        </form>

        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={todos.map((todo) => todo.id)}>
            <ul className="todos-con">
              <div>
                <p>
                  Priority
                </p>
                <div className="toggle-grid">
                  <button>Grid</button>
                </div>
                <p>
                  High
                </p>
              </div>

              {
                todos.map((todo) => {
                  const { id, name, completed } = todo;
                  return <List
                    removeTodo={handleRemove}
                    key={id}
                    name={name}
                    completed={completed}
                    id={id}
                  />

                })
              }
            </ul>
          </SortableContext>
        </DndContext>

      </AppStyled>

    </>
  );
}

const AppStyled = styled.div`
  min-height: 100vh;
  padding: 5rem 25rem;
  background-color: ${(props) => props.theme.colorBg3};
  overflow: hidden;
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${(props) => props.theme.colorBg2};
    border-radius: 1rem;
    margin-bottom: 2rem;
    padding: 2rem 1rem;
    box-shadow: ${(props) => props.theme.shadow3};
    border: 1px solid ${props => props.theme.colorIcons3};
    h1{
      font-size: clamp(1.5rem, 2vw, 2.5rem);
      font-weight: 800;
      color: ${(props) => props.theme.colorPrimaryGreen};
    }
    .input-container{
      margin: 2rem 0;
      position: relative;
      font-size: clamp(1rem, 2vw, 1.2rem);
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      input, button{
        font-family: inherit;
        font-size: clamp(1rem, 2vw, 1.2rem);
      }
      input{
        background: transparent;
        border:1px solid ${(props) => props.theme.colorIcons3};
        border-radius: 7px;
        padding: .8rem 1rem;
        color: ${(props) => props.theme.colorGrey2};
        width: 100%;
        &:focus{
          outline: none;
        }
        &::placeholder{
          color: ${(props) => props.theme.colorGrey3};
        }
        &:active, &:focus{
          border: 1px solid ${(props) => props.theme.colorIcons};
        }
      }
      button{
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        border: none;
        background: ${(props) => props.theme.colorPrimaryGreen};
        height: 100%;
        padding: 0 1rem;
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
        color: ${(props) => props.theme.colorWhite};
        transition: all .3s ease;
        &:hover{
          background: ${(props) => props.theme.colorPrimary2};
        }
      }
    }
  }

  .todos-con{
    overflow: hidden;
    background: ${(props) => props.theme.colorBg2};
    padding: 5rem;
    border-radius: 1rem;
    box-shadow: ${(props) => props.theme.shadow3};
    border: 1px solid ${props => props.theme.colorIcons3};
    .todos{
      display: ${(props) => props.grid ? 'grid' : ''};
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      grid-column-gap: 1rem;
      transition: all .3s ease;
      grid-row-gap: ${(props) => props.grid ? '0' : '1rem'};
    }
    .priority-con{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      p{
        font-size: clamp(1rem, 2vw, 1.2rem);
        font-weight: 600;
        color: ${(props) => props.theme.colorGrey2};
        &:last-child{
          color: ${(props) => props.theme.colorDanger};
        }
      }
    }
    .toggle-grid{
      button{
        padding: .5rem 1rem;
        border-radius: 7px;
        background: ${(props) => props.theme.buttonGradient11};
        border: 1px solid ${(props) => props.theme.colorIcons3};
        cursor: pointer;
        font-size: clamp(1rem, 2vw, 1.6rem);
        color: ${(props) => props.theme.colorGrey1};
        transition: all .3s ease;
      }
    }

    .low-priority{
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
      p{
        font-size: clamp(1rem, 2vw, 1.2rem);
        font-weight: 600;
        background-clip: text;
        background: ${(props) => props.theme.colorPrimaryGreenGrad};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
`;

export default App;
