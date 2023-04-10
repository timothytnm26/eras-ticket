import "./styles/App.css";
import ErasBanner from "./components/Banner";
import TicketForm from "./components/TicketForm";
function App() {
  return (
    <div className="App">
      <ErasBanner/>
      <TicketForm/>
    </div>
  );
}

export default App;
