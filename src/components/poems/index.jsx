import React from "react";
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import { Loader} from "semantic-ui-react"
import {getString, TypeOrder,} from '../../utils'
import Poem from './poem'
import styles from './poems.module.css'
import global from '../../global.module.css'
import Search from "../container/search";
import {useQuery} from "@apollo/client";
import {getPoems} from "../../queries";
import {setPoemsRefetch} from "../../features/refetch-slice";

const Poems = () => {
    const { order, currentCategory: category, categories} = useSelector(state => state)
    const [search, setSearch] = useState(null)
    const dispatch = useDispatch()
    const {poems} = useSelector(s=>s.refetchQueries)
    const {loading, error, data, refetch} = useQuery(getPoems, {
        variables: {
            poemsCategory: category !== 'all' ? category : undefined,
            poemsOrder: order === TypeOrder.desc ? 'DESC' : 'ASC',
            poemsSearch: search !== null && search.length>3 ?  `%${search}%`:undefined
        }
    })

    useEffect(async ()=>{
        console.count(poems)
        if(poems){
            dispatch(setPoemsRefetch(false))
            const v = await  refetch()
            console.log('poem refetch ', v)
        }
    }, [poems])

    const renderPoems = () => {
        if (error) return <h1>{error.message}</h1>
        if (loading) {
            return <Loader active/>
        }
        if (data?.poems.length === 0) return <div className={styles.resultsFounded}>Δεν υπάρχουν αποτελέσματα με αυτά τα
            κριτήρια </div>

        if (data) return (<>
            <div
                className={styles.resultsFounded}>{data?.poems.length > 1 ? `Βρέθηκαν ${data?.poems.length} κείμενα.` : `Βρέθηκε ${data?.poems.length} κείμενο`}</div>
            {data?.poems.map(p => <Poem key={p.id} poem={p} category={p.category.description}/>)}
        </>)

    }

    return <>
        <div className={styles.optionsContainer}>
            <div className={styles.orderOptionsPanelHeader}>
                <div><label>Ταξινόμηση αποτελεσμάτων ημερολογιακά: <span
                    className={global.boldItalic}>{orderToString(order)}</span></label></div>
                <div><label>Φίλτρο: <span
                    className={global.boldItalic}> {category !== 'all' ? categories.filter(c=> c.id === category)[0].description : 'όλες οι κατηγορίες'}</span></label>
                </div>
                <div><Search search={search} setSearch={setSearch} /></div>
            </div>

        </div>
        {renderPoems()}

    </>
}

export default Poems

const orderToString = (vl) => {
    if (getString(vl) === 'asc') {
        return 'Αύξουσα'
    }
    return 'Φθίνουσα'
}


