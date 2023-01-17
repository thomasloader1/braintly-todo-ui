import braintlyLogo from "./assets/braintlyLogo.jpeg";
import "./App.scss";
import Spinner from "./components/Spinner";
import TaskList from "./components/TaskList";
import { useContext } from "react";
import { AppContext } from "./Provider/StateProvider";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const { loadingTasks, priorities } = useContext(AppContext);
  return (
    <div className="container">
      <img src={braintlyLogo} className="img-fuild" width={80} alt="" />
      <h1>ToDo List - Braintly</h1>
      <h3>Agregar tarea una tarea nueva</h3>
      <AddTodoForm priorities={priorities} />
      {loadingTasks ? <Spinner /> : <TaskList />}
    </div>
  );
}

export default App;
