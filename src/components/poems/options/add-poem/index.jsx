import React from 'react';
import clonedeep from 'lodash.clonedeep'
import {DateTime} from 'luxon'
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {Button, Form, Input, Loader, Select, TextArea} from 'semantic-ui-react'
import Container from '../../../container';
import styles from './styles.module.css'
import CheckIfExists from '../../../../functional/check-exists';
import CheckError from '../../../../functional/check-ready';
import {useLazyQuery, useMutation} from '@apollo/client';
import {addPoem} from '../../../../queries';

const checkReady = (values) => {

    const errors = []
    if ( values.id == null || values.id <= 0 || values.id === "") {
        errors.push('Δεν τέθηκε id ή ήταν μικρότερη απο το 0 ή κενή')
    }
    if ( values.authDate == null) {
        errors.push('δεν δώθηκε ημερομνηία')
    }
    if ( values.category == null || values.category === 'all' ){
        errors.push('Δεν ορίσθηκε κατηγορία')
    }
    if (values.idInCategory ==null || values.idInCategory === ""){
        errors.push('δεν δώθηκε id στην κατηγορία')
    }
    if (values.content == null || values.content.trim().length < 5){
        errors.push('δεν δώθηκε κείμενο ή είναι πολύ μικρό')
    }
    return errors.length === 0
}

const AddPoem = () => {
    const [options, setOptions] = useState([{key: 'all', text: 'Σε όλες τις κατηγορίες', value: 'all'}])
    const {categories, info, minMaxByCategory} = useSelector(s => s)
    const [isReady, setIsReady] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    const [changes, setChanges] = useState({})
    const [rowExists, setRowExists] = useState(true)

    const [values, setValues] = useState({authDate: DateTime.local().toISODate()})
    const [addPoemFunction, {data, loading, error, variables}] = useMutation(addPoem, {
        variables: {
            input: {
                id: Number(values.id),
                idInCategory: Number(values.idInCategory),
                content: values.content,
                category: values.category,
                authDate: values.authDate,
                explanation: values.explanation
            }
        }
    })
    const handleChange = (e, {value}) => {
        const local = clonedeep(values)

        const pr = e.target.name
        local[pr] = value
        setValues(local)
    }

    useEffect(() => {
        if (categories) {
            const local = []
            categories.map(category => local.push({
                key: category.id,
                text: category.description,
                value: category.id
            }))
            setOptions(local)
            console.log(local)
        }
    }, [categories])

    useEffect(() => {
        if (info) {
            setValues({...values, id: info.maxIdPoems + 1})
        }
    }, [info])

    useEffect(() => {
        console.log(options, 'options')
    }, [options])

    useEffect(()=>{

        setIsReady(checkReady(values))
    },[values,setIsReady])
    useEffect(() => {
        if (data) {

            console.log('lazy, data ', data)
            // setValues({authDate: DateTime.local().toISODate(), content: '', id: 0, idInCategory: 0, category:})
            setIsReady(false)
            alert(`Επιτυχής καταχώριση! Ιd ${data?.addPoem.id}`)
        }
    }, [data])

    useEffect(() => {
        console.log('lazy loading,', loading)
    }, [loading])

    useEffect(() => {
        if (error)
            console.log('lazy error,', JSON.stringify(error,null,2))
    }, [error])

    return (
        <Container>
            <Loader content={'Αποθήκευση...'} active={loading} />
            <div className={styles.addPoemContainer}>
                <h3>Προσθήκη καταχώρισης</h3>
                <Form>
                    {isChanged && <div><h4>Υπάρχουν αλλαγές</h4> <textarea value={JSON.stringify(changes)} readOnly/>
                    </div>}
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label='Γενικός αριθμός καταχώρησης'
                            type={'number'}
                            width={3}
                            value={values?.id || ''}
                            onChange={handleChange}
                            // onKeyUp = {handleChange}
                            // onInput = {handleChange}
                            name='id'
                        />
                        <Form.Field
                            control={Input}
                            label='Αριθμός καταχώρησης Κατηγορίας'
                            type={'number'}
                            width={3}
                            value={values?.idInCategory || ''}
                            onChange={handleChange}
                            name='idInCategory'
                        />
                        <Form.Field
                            control={Input}
                            label='Ημερομηνία συγγραφής'
                            type={'date'}
                            width={3}
                            value={values.authDate || ''}
                            onChange={handleChange}
                            name='authDate'
                        />
                    </Form.Group>
                    <Form.Field
                        control={Select}
                        options={options}
                        label='Κατηγορία'
                        placeholder={'επιλογή κατηγορίας...'}
                        name='category'
                        value={values.category || ''}
                        onChange={(e, {value}) => {
                            const minMax = minMaxByCategory.filter(mm => mm.category === value)[0].max
                            setValues({...values, category: value, idInCategory: minMax + 1})
                            // setMinNewIdInCategory(minMax + 1)
                            // if (value !== values['category']) {
                            //     setChanges({...changes, category: value})
                            //     setIsChanged((c) => c || true)
                            // } else {
                            //     const lC = clonedeep(changes)
                            //     delete lC['category']
                            //     setChanges(lC)
                            // }
                            // setIsReady(checkReady())
                        }
                        }

                    />
                    <Form.Field
                        control={TextArea}
                        label='Κείμενο'
                        name={'content'}
                        value={values.content || ''}
                        onChange={handleChange}
                        onFocus={(e) => auto_grow(e.target)}
                    />
                    <Form.Field
                        control={TextArea}
                        label='Επεξήγηση'
                        name={'explanation'}
                        value={values.explanation !== null ? values.explanation : ''}
                        onChange={handleChange}
                        onFocus={(e) => auto_grow(e.target)}
                    />
                    <Form.Field
                        control={Button}
                        disabled={rowExists}
                        onClick={
                            (e) => {
                                e.preventDefault()
                                console.log(values)
                                addPoemFunction()
                            }
                        }>Καταχώρηση αλλαγών</Form.Field>
                </Form>
            </div>
            <CheckError values={values} />
            <CheckIfExists check={isReady} setExists={setRowExists} values={values} />
        </Container>
    )
}

function auto_grow(element) {
    element.style.height = '5px';
    element.style.height = (element.scrollHeight + 10) + 'px';
}

export default AddPoem
