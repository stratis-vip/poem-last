import React, {useEffect, useState} from 'react'
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {addAllPoems} from './features/content-slice'
import {addAllCategories} from './features/categories-slice'
import {HashRouter,} from "react-router-dom"
import {Route, Switch} from "react-router"
import Container from "./components/container";
import Poems from "./components/poems";
import Detail from "./components/detail";
import AddPoem from "./components/poems/options/add-poem";

const About = () => {
    return (<>
        <Container><h4>About</h4></Container>
    </>)
}

const Home = () => {
    return (<>
        <Container><Poems /></Container>
    </>)
}

function App() {
    const [count, setCount] = useState(0)
    const {content, categories} = useSelector(s => s)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!content) {
            loadContent()
        }
        console.log('useeffect', content)
    }, [content, categories])

    const loadContent = () => {
        console.count('loadContent')
        import('../poems.json').then(c => {
            if (c?.poems?.length > 0) {
                dispatch(addAllPoems( c.poems))
            }
            if (c?.categories) {
                dispatch(addAllCategories(c.categories))
            }
        }).catch(er => console.error(er))
    }

    return (
        <HashRouter>
            <div className="App">
                <Switch>
                    <Route path="/about">
                        <About/>
                    </Route>

                    <Route path={"/detail/:id"}>
                        <Detail/>
                    </Route>
                    <Route path={"/add/:id"}>
                        <AddPoem />
                    </Route>
                    <Route path={"/"}>
                        <Home/>
                    </Route>
                </Switch>

            </div>
        </HashRouter>
    )
}

export default App
