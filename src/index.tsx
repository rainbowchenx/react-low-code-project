/*
 * @Author: rainbowchen 1664373735@qq.com
 * @Date: 2023-05-22 12:14:46
 * @LastEditors: rainbowchen 1664373735@qq.com
 * @LastEditTime: 2023-07-24 22:50:30
 * @FilePath: \react-low-code-project\src\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
//
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
