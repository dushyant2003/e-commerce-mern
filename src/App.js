import SwitchRouting from "./Routing/SwitchRouting"
import {Provider} from "react-redux"
import store from "./Store/Store"
const App = () => {
  store.subscribe(()=>{
    localStorage.setItem("reduxStore",JSON.stringify(store.getState()))
  })
  return (
    <>
      <Provider store={store}>

        <SwitchRouting />
      </Provider>
      
    </>
  )
}

export default App