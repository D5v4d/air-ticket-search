import { Provider } from "react-redux"
import Header from "./pages/header/Header"
import Main from "./pages/main/Main"
import { store } from "./redux/store"

function App() {

  return (
    <Provider store={store}>
      <Header/> 
      <Main/>
    </Provider>
  )
}

export default App
