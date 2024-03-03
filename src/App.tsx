import TabManagment from "./features/tabs/TabManagment";
import VerticalTabs from "./features/tabs/Tabs";

function App() {
  return (
    <div className="flex flex-col bg-white-bg h-[100vh] divide-y-2">
      <h1 className="text-xl text-white-bg bg-blue-dark font-semibold w-full self-center py-4 text-center">
        Free Your Mind
      </h1>
      <TabManagment />
      <VerticalTabs />
    </div>
  );
}

export default App;
