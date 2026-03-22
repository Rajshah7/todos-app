import { useState } from "react";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  console.log(todoList, "todoList");

  function handleChange(e) {
    setUserInput(e.target.value);
  }

  function handleTodoChange(e, id) {
    setTodoList((prev) => {
      return prev.map((t) =>
        t.id === id ? { ...t, text: e.target.value } : t
      );
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTodoList((prev) => [
      ...prev,
      { id: Date.now(), text: userInput, isOpen: false },
    ]);
    setUserInput("");
  }

  function handleDelete(id) {
    setTodoList((prev) => {
      return prev.filter((t) => t.id !== id);
    });
  }

  function handleEdit(id) {
    setTodoList((prev) => {
      return prev.map((todo) =>
        todo.id === id ? { ...todo, isOpen: !todo.isOpen } : todo
      );
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={userInput} />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Todo List</h3>
        {todoList &&
          todoList.map((todos) => {
            return (
              <span key={todos.id}>
                <h2>
                  {!todos.isOpen ? (
                    todos.text
                  ) : (
                    <>
                      <input
                        type="text"
                        onChange={(e) => handleTodoChange(e, todos.id)}
                        defaultValue={todos.text}
                      />
                    </>
                  )}
                </h2>

                <button onClick={() => handleEdit(todos.id)}>
                  {!todos.isOpen ? "Edit" : "changed"}
                </button>
                <button onClick={() => handleDelete(todos.id)}>Delete</button>
              </span>
            );
          })}
      </div>
    </>
  );
}
