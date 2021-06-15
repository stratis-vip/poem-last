import React, {useEffect, } from 'react'
import './App.css'
import {BrowserRouter,} from "react-router-dom"
import {Route, Switch} from "react-router"
import Container from "./components/container";
import Poems from "./components/poems";
import Detail from "./components/detail";
import AddPoem from "./components/poems/options/add-poem";
import {countPoems} from './queries'
import {useLazyQuery} from "@apollo/client";
import {Loader} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {addAllCategories} from './features/categories-slice'
import {addAllInfo} from "./features/info-slice";
import {addAllMinMaxByCategories} from "./features/minmax-slice";
import Import from "./components/import/import";
import {setStatisticsRefetch} from "./features/refetch-slice";

const Home = () => {
    return (<>
        <Container><Poems /></Container>
    </>)
}

function App() {
    const dispatch = useDispatch()
    const {statistics} = useSelector(s=>s.refetchQueries)
    const [getPoems, {loading, data:dataPoems, refetch}] = useLazyQuery(countPoems)

    useEffect(()=>{
        if (dataPoems) {
            console.log(dataPoems)
            const {countPoems,countCategories,maxIdPoems,categories, minMaxByCategory} = dataPoems
            dispatch(addAllInfo({countPoems, countCategories, maxIdPoems}))
            dispatch(addAllMinMaxByCategories(minMaxByCategory))
            dispatch(addAllCategories(categories))
        }
    },[dataPoems])

    useEffect(()=>{
        getPoems()
    },[])

    useEffect(async ()=>{
        if(statistics){
            dispatch(setStatisticsRefetch(false))
            try {
                const st = await refetch()
                console.log('statistics' ,st)
            }catch (e){
                console.log(JSON.stringify(e,null,2))
            }
        }
    },[statistics])

    if (loading) return <Loader content={'Ανάκτηση δεδομένων...'} active />
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/import">
                        <Import/>
                    </Route>

                    <Route path={"/detail/:id"}>
                        <Detail/>
                    </Route>
                    <Route path={"/add"}>
                        <AddPoem />
                    </Route>
                    <Route path={"/"}>
                        <Home/>
                    </Route>
                </Switch>

            </div>
        </BrowserRouter>
    )
}

export default App
