import React, { useState } from "react";

import "./app.css";
import Navbar from "./Navbar";

const App = (props) => {
  const [account, setAccount] = useState('0x0');

  return (
    <>
      <Navbar account={account}/>
      <div className='test-center'>App</div>
    </>
  );
};

export default App;
