import React from "react";
import {DateTime} from "luxon"
import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {Button, Loader} from "semantic-ui-react"
import Container from "../container"
import styles from "./detail.module.css"
import {Link} from "react-router-dom";

import {useParams} from "react-router"

const Detail = () => {
  const content = useSelector(s => s.content)
  const categories = useSelector(s=>s.categories)
  const [poem, setPoem] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    if (content) {
      const local = content.filter(c => c.id === Number(id))
      if (local.length > 0) {
        setPoem(local[0])
      }
    }
  }, [content, setPoem, id])

  if (poem === null) return <Loader active />
  return (
    <Container>
      <div className={styles.detailMain}>
        <h3>Λεπτομέρειες για το κείμενο με αρθμό καταχώρησης {poem.id}</h3>
        {categories && <div><span className={styles.bold}>Κατηγορία: </span>{categories[poem.category]}</div>}
        <div><span className={styles.bold}>Καταχώρηση στην κατηγορία: </span>{poem?.idInCategory}</div>
        <div><span className={styles.bold}>Ημερομηνία συγγραφής: </span>{DateTime.fromISO(poem.authDate).toLocaleString(DateTime.DATE_MED)}</div>
        <h3>Κείμενο</h3>
        <div className={styles.pre} key={poem?.id}>{poem?.content}</div>
        {poem.explanation && <div><span className={styles.bold}>Επεξηγήσεις: </span>{poem.explanation}</div>}
        <h3>Παραπομπές</h3>
        <Link to={`/add/${poem.id}`}><Button>Επεξεργασία</Button></Link>

      </div>
    </Container>
  )
}

export default Detail
