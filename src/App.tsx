import React, { useState } from 'react'
// import List1 from './list1'
import StateDemo from './StateDemo'
import StateDemo2 from './StateDemo2'
import List1 from './list1'
import ImmerDemo from './ImmerDemo'
import List2 from './List2'
import UseRefDemo from './UseRefDemo'
function App() {
  // 列表

  return (
    <>
      {/* <List1></List1> */}
      {/* <StateDemo></StateDemo> */}
      {/* <StateDemo2></StateDemo2> */}
      <List1></List1>
      <div>
        .......................................................................................................
      </div>
      <ImmerDemo></ImmerDemo>
      <div>
        ....................................................................................................................
      </div>
      <List2></List2>
      <div>
        .......................................................................................
      </div>
      <UseRefDemo></UseRefDemo>
    </>
  )
}

export default App
