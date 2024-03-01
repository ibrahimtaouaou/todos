import TabManagment from "./features/tabs/TabManagment";
import VerticalTabs from "./features/tabs/Tabs";

function App() {
  return (
    <div className="flex flex-col m-4">
      <h1 className="text-xl text-red-400 self-center mt-4">TODOS</h1>
      <TabManagment />
      <VerticalTabs />
    </div>
  );
}

export default App;
