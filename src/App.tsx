import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import { routes } from './config/routes'

const App: React.FC = () => {
    return (
        <div>
            <Router>
                <Switch>
                    {
                        routes.map((route: {
                            path: string,
                            component: React.FC
                        },index: number) => {
                            return(
                                <Route 
                                    path={route.path} 
                                    component={route.component} 
                                    key={index}
                                    exact
                                />
                            )
                        })
                    }
                </Switch>
            </Router>      
        </div>
    )
}

export default App
