import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <p className="underline">안녕하세요.</p>
    </div>
  );
}

export default App;
