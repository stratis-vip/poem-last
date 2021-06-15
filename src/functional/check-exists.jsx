import {useLazyQuery, useQuery} from "@apollo/client";
import {useEffect, useState} from "react";
import {checkIfExists} from "../queries";
import React from "react";

const CheckIfExists = ({values, setExists, check}) => {
    const {idInCategory, category, id, content} = values
    const [InError, setErrors] = useState([])
    const  [checkDB, {loading, variables, error, data}] = useLazyQuery(checkIfExists,
        {
            variables: {
                idInCategory: Number(idInCategory),
                category,
                id: Number(id),
                content,
            }
        })



    useEffect(() => {
        // debugger
        if (check) {
            checkDB()
        }else {
            setErrors([])
        }
    }, [check])


    useEffect(() => {
        if (data) {
            const errors = []
            const {getPoemByCategoryId,getPoemByContent,getPoemById} = data
            if (getPoemByCategoryId.length > 0){
                errors.push(`Υπάρχει ήδη καταχώρηση με idCategory = ${idInCategory}!`)
            }
            if (getPoemByContent.length > 0){
                errors.push(`Υπάρχει ήδη καταχώρηση με αυτό το κείμενο!`)
            }
            if (getPoemById != null){
                errors.push(`Υπάρχει ήδη καταχώρηση με  id = ${id}!`)
            }

            setErrors(errors)
            setExists(errors.length > 0)
        }
    }, [data])

    useEffect(() => {
        if (error) {
            console.log('error', JSON.stringify(error,null,2))
        }
    }, [error])


    if (error) return <>Error</>
    if (loading) return <>Loading</>
    if (InError?.length > 0) {
        return <>{InError.map((error, idx) => <div key={idx}>{error}</div>)}</>
    }else {
        if (check){
            return <>Η καταχώριση είναι έτοιμη για αποθήκευση!</>
        }
    }
    return (<></>)

}

export default CheckIfExists