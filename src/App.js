import KanBoardColoumns from "./components/KanBoard/KanBoardColoumns";
import "../src/components/KanBoard/KanBoard.css"
import FloatingBox from "./components/FloatingBox/FloatingBox";
function App() {
  return (
    <div className="App">
      <h1 className="name">Kan Board</h1>
      <KanBoardColoumns/>
      <FloatingBox/>
    </div>
  );
}

export default App;
