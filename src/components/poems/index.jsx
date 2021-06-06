import React from "react";
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Button, Loader} from "semantic-ui-react"
import {getString, sortByDate, } from '../../../src/utils.js'
import Poem from './poem'
import styles from './poems.module.css'
import global from '../../global.module.css'
import {setLoading} from "../../features/loading-slice";
import Search from "../container/search";

const Poems = () => {
  const {content, order, categories, currentCategory:category, loading} = useSelector(state => state)
  const dispatch = useDispatch()

  const [poems, setPoems] = useState(null)

  useEffect(() => {
    if (content && order && category) {

      if (category === 'all') {
        setPoems(sortByDate(content, 'authDate', order))
      } else {
        const contentByCategory = content.filter(c => c.category === category)
        setPoems(sortByDate(contentByCategory, 'authDate', order))
      }
      dispatch(setLoading(false))
    }else {
      if (!loading){
        dispatch(setLoading(true))
      }
    }
  }, [content, order, category, dispatch])

  const renderPoems = () => {
    if (loading){
      return <Loader active />
    }
    if (!poems || poems.length === 0) {
      return <div className={styles.resultsFounded}>Δεν υπάρχουν αποτελέσματα με αυτά τα κριτήρια </div>
    } else {
      if (poems?.length > 0) {

        return (<>
          <div className={styles.resultsFounded}>{poems.length > 1? `Βρέθηκαν ${poems.length} κείμενα.`:`Βρέθηκε ${poems.length} κείμενο`}</div>
          {poems.map(p => <Poem key={p.id} poem={p} category={categories[p.category]} />)}
          </>)
      }
    }
  }

  return <>
    <div className={styles.optionsContainer}>
      <div className={styles.orderOptionsPanelHeader}>
        <div><label>Ταξινόμηση αποτελεσμάτων ημερολογιακά: <span className={global.boldItalic}>{orderToString(order)}</span></label></div>
        <div><label>Φίλτρο: <span className={global.boldItalic}> {category !== 'all' ? categories[category]: 'όλες οι κατηγορίες'}</span></label></div>

        <div><Search /></div>
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


