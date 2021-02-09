import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [Lists, setLists] = useState([]);
  const [Value, setValue] = useState("");

  useEffect(() => {
    // 데이터베이스에 있는 값을 가져온다.
    axios.get("/api/values").then((res) => {
      if (res.data.success) {
        setLists(res.data);
      }
    });
  }, []);

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("/api/value", { value: Value }).then((res) => {
      if (res.data.success) {
        console.log("res", res);
        setLists([...Lists, res.data]);
        setValue("");
      } else {
        alert("값을 db에 넣는 것에 실패했습니다");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {Lists &&
            Lists.forEach((list, index) => <li key={index}>{list.value}</li>)}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={Value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
