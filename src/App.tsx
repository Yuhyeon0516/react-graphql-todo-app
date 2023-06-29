import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "./apollo/todos";
import TodoItem from "./components/TodoItem";
import { IList } from "./types";
import { useState } from "react";

function App() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [input, setInput] = useState("");
  const counter = (): string => {
    if (data?.allTodos as IList[]) {
      const completed = data.allTodos.filter((todo: IList) => todo.checked);
      return `${completed.length}/${data?.allTodos.length}`;
    }
    return "0/0";
  };

  if (error) return <div>Network Error</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="mt-5 text-3xl">
        Todo App&nbsp;<span className="text-sm">({counter()})</span>
      </div>
      <div className="w-5/6 md:w-1/2 lg:w-3/5">
        <form className="flex justify-between p-5 my-5 text-4xl border-2 rounded-md shadow-md">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 작성해주세요."
            type="text"
            className="outline-none border-b-[1px] text-xl w-10/12 focus:border-b-[3px]"
          />
          <div>
            <button type="submit" className="hover:scale-105">
              +
            </button>
          </div>
        </form>
        {loading ? <div>Loading...</div> : <ul>{data && data.allTodos.map((item: IList) => <TodoItem key={item.id} item={item} />)}</ul>}
      </div>
    </div>
  );
}

export default App;
