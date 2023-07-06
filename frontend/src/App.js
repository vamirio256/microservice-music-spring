import Login from "./components/Login";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="flex justify-center">
      <div className="container bg-orange-400 ma">
        <HomePage />
      </div>
      <div className="w-screen flex justify-center items-center h-screen absolute bg-slate-200/50">
        <Login />
      </div>
    </div>
  );
}

export default App;
