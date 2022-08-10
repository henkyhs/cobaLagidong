import { Provider } from 'react-redux'
import { store, RootRoutes } from './config'

const App = () => {
  return (
    <Provider store={store}>
      <RootRoutes/>
    </Provider>
  )
}

export default App
