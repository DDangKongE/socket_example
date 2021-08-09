import './App.css';
import { useDispatch, useSelector } from 'react-redux';
// import { btnClick } from '';
import { btnClick } from './store/modules/test';
import {createContext} from "react";
import Children from "./children";

export const AppContext = createContext();

function App() {
  const dispatch = useDispatch();
  const { testList } = useSelector((state) => state.test);
  console.log(testList);
  // const onClickBtn = () => {
  //   dispatch(btnClick());
  // }
    const user = {
      name: "안수환",
      job: "가수"
    };
  return (
      <AppContext.Provider value={user} >
        <div className="App">
          <Children/>
          {/*<button onClick={onClickBtn}>aaaa</button>*/}
          {/*{testList}*/}
        </div>
      </AppContext.Provider>
  );
}

export default App;
