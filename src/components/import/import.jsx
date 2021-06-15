import React, {useEffect, useState} from "react";
import Container from "../container";
import {Button, Loader} from "semantic-ui-react";
import styles from './import.module.css'
import {useMutation} from "@apollo/client";
import {bulkImport} from "../../queries";
import {useDispatch} from "react-redux";
import {refetchAll} from "../../features/refetch-slice";

const Import = () => {
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const [objToImport, setObjToImport] = useState(null)
    const [importBulk, {called, data, loading, error}] = useMutation(bulkImport,
        {
            variables: {
                input: objToImport?.poems
            }
        })

    useEffect(async () => {
        if (objToImport) {
            try {
                const v = await importBulk()
                dispatch(refetchAll())
                console.log(v)

            } catch (e) {
                console.log(JSON.stringify(e, null, 2))
            }
        }
    }, [objToImport])

    useEffect(() => {
        if (data) console.log(data)
    }, [data])
    useEffect(() => {
        if (error) console.log(error)
    }, [error])

    useEffect(() => {
        if (file) {
            const reader = new FileReader()
            reader.readAsText(file, 'utf8')
            reader.onloadend = (e) => {
                const objToImp = JSON.parse(e.target.result)
                setObjToImport(objToImp)
                console.log(objToImp)
            }
        }
    }, [file])

    return (<Container>
        <Loader active={loading}/>
        <h1>import {file?.name} {file?.size}</h1>

        <div className={styles.importContainer}>
            <input type="file"
                   accept=".json"
                   onChange={(e) => {
                       const localFile = e.target.files[0]
                       setFile(localFile)
                   }
                   }/>
            <Button primary disabled={!file} onClick={() => {
            }}>Εισαγωγή {objToImport?.poems.length}</Button>
        </div>
    </Container>)
}

export default Import