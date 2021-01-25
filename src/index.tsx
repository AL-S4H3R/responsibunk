import React from 'react'
import { render } from 'react-dom'
import './index.css'
// import { Provider } from 'react-redux'
import App from './App'
// import store from './redux/store'

const Main: React.FC = () => {
    return(
        // <Provider store={store}>
            <App/>
        // </Provider>
    )
}

render(<Main/>, document.getElementById('root'))