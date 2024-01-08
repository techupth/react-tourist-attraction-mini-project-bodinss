import "./App.css";
import { TravelAttractionList } from "../components/travelattractionlists";
import { Header } from "../components/header";
function App() {
  return (
    <div className="App">
      <Header />
      <TravelAttractionList />
    </div>
  );
}

export default App;
