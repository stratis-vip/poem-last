import React from "react";
import {DateTime} from "luxon"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {Button, Loader} from "semantic-ui-react"
import Container from "../container"
import styles from "./detail.module.css"
import {Link} from "react-router-dom";

import {useParams} from "react-router"
import {useLazyQuery, useQuery} from "@apollo/client";
import {getPoemById} from "../../queries";
import {onError} from "@apollo/client/link/error";

const Detail = () => {
    const [poem, setPoem] = useState(null)
    const {id} = useParams()
    const { loading, data, error, variables} = useQuery(getPoemById,
        {
            variables: {id: Number(id)}
        })
    useEffect(() => {
        if (data) {
            setPoem(data["getPoemById"])
        }
    }, [data])


    if ( loading) return <Loader active/>
    if (poem) return (
        <Container>
            <div className={styles.detailMain}>
                <h3>Λεπτομέρειες για το κείμενο με αρθμό καταχώρησης {poem.id}</h3>
                <div><span className={styles.bold}>Κατηγορία: </span>{poem.category.description}</div>
                <div><span className={styles.bold}>Καταχώρηση στην κατηγορία: </span>{poem?.idInCategory}</div>
                <div><span
                    className={styles.bold}>Ημερομηνία συγγραφής: </span>{DateTime.fromISO(poem.authDate).toLocaleString(DateTime.DATE_MED)}
                </div>
                <h3>Κείμενο</h3>
                <div className={styles.pre} key={poem?.id}>{poem?.content}</div>
                {poem.explanation && <div><span className={styles.bold}>Επεξηγήσεις: </span>{poem.explanation}</div>}
                <h3>Παραπομπές</h3>
                <Link to={`/add/${poem.id}`}><Button>Επεξεργασία</Button></Link>

            </div>
        </Container>
    )
    if (error) return <h1>{error.message}</h1>
    if (variables) return <h2>{JSON.stringify(variables)}</h2>
}

export default Detail
