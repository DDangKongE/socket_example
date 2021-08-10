import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { btnClick } from './store/modules/test';
import { createContext, useState } from 'react';
import Children from './children';

export const AppContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { testList } = useSelector((state) => state.test);
  const onClickBtn = () => {
    dispatch(btnClick());
  };
  return (
    <div className='App'>
      <Children />

      {testList.map((v,i) => {
        return (
          <div key={i}>{v}</div>
        )
      })}
      <br />
      <br />
      <br />
      <br />
      <div>
        <input type='text' id='msg' onChange={(e) => setText(e.target.value)} />
      </div>
      <div onClick={onClickBtn}>
        메세지 보내기
      </div>
    </div>
  );
}

export default App;
