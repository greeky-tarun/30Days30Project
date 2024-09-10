import { useState } from "react";
import Input from "./components/input"
function App() {
  const [taskList, setTaskList] = useState("");
  return (
    <div className="flex flex-row items-center gap-3">
      <h1>Daily Duties(to-do board)</h1>
      <Input taskList={taskList} setTaskList={setTaskList}/>
      <div>
        {taskList.map((task, index) =>
          <li key={index}>{task}</li>)}
      </div>
    </div>
  );
}

export default App;
