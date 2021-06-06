import React from "react";
import {DateTime} from 'luxon'
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import styles from './poem.module.css'
import global from '../../../global.module.css'
import {useSelector} from "react-redux";
import {Button, Loader} from "semantic-ui-react";

const showMoreText = (text, show, setShow) => {
    if (!text) return null
    if (text.length > MORE_LENGTH) {
        if (show) {
            return <div>
                {`${text.substring(0, MORE_LENGTH)}...`}
                <Button size={"mini"} compact color={"green"} onClick={() => setShow(false)}>περισσότερα</Button>
            </div>
        } else {
            return <div>
                {text}
                <Button size={"mini"} compact color={"green"} onClick={() => setShow(true)}>λιγότερα</Button>
            </div>
        }
    } else {
        return <div>{text}</div>
    }
}
const MORE_LENGTH = 150
const Poem = ({poem, category}) => {
    const [text, setText] = useState(null)
    const [show, setShow] = useState(true)
    const showText = showMoreText(text, show, setShow)

    const load = useSelector(s => s.loading)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        if (load && load !== loading) {
            console.log('loading...', load)
            setLoading(load)
        }
    }, [load, loading])


    useEffect(() => {
        if (poem) {
            setText(poem.content)
        }
    }, [poem])

    useEffect(() => {
        if (!show)
            showMoreText(text, show, setShow)
    }, [show, text])


    if (loading) return <Loader active/>
    if (!poem) return <>Δεν υπάρχει τίποτα</>

    return (

            <div className={styles.poemContainer}>
                <div className={styles.info}>
                    <label className={styles.poemLabel}>Αρ. καταχώρησης: <span className={global.boldItalic}> #{poem.id}</span></label>
                    <label className={styles.poemLabel}>{category} <span className={global.boldItalic}>#{poem.idInCategory}</span></label>
                    <label
                        className={styles.poemLabel}>Ημνία: <span className={global.boldItalic}>{DateTime.fromISO(poem.authDate).toLocaleString(DateTime.DATE_MED)}</span></label>
                    <Link to={`/detail/${poem.id}`}><Button size={"mini"} compact color={"blue"}>Λεπτομέρειες</Button></Link>
                </div>
                < pre>{showText}</pre>
            </div>
        )
}

export default Poem
