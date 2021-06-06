import React from "react";
import clonedeep from 'lodash.clonedeep'
import {DateTime} from "luxon"
import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Button, Form, Input, Select, TextArea} from "semantic-ui-react"
import {getContentMinMaxId} from "../../../../utils.js"
import {useParams} from "react-router";
import Container from "../../../container";
import styles from './styles.module.css'

const ModeType = {
    'ADD': 0,
    'EDIT': 1
}

const AddPoem = () => {
    const [options, setOptions] = useState([{key: 'all', text: 'Σε όλες τις κατηγορίες', value: 'all'}])
    const {categories, content} = useSelector(s => s)
    const [minNewId, setMinNewId] = useState(null)
    const [minNewIdInCategory, setMinNewIdInCategory] = useState(null)
    const [mode, setMode] = useState(ModeType.ADD)
    const [poem, setPoem] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    const [changes, setChanges] = useState({})

    const [values, setValues] = useState({authDate: DateTime.local().toISODate()})
    const {id} = useParams()
    const dispatch = useDispatch()
    const handleChange = (e, {value}) => {
        const local = clonedeep(values)
        const pr = e.target.name
        local[pr] = value
        console.log(value, '!==', poem[pr])
        const testValue = typeof value === "string" ? value : Number(value)
        // debugger
        if (testValue !== poem[pr]) {
            setChanges({
                ...changes,
                [pr]: testValue
            })
            setIsChanged((c) => c || true)
        } else {
            const lC = clonedeep(changes)
            delete lC[pr]
            setChanges(lC)
        }
        setValues(local)
    }

    useEffect(() => {
        console.log('changes φρομ useeffect', changes)
        if (Object.keys(changes).length === 0) {
            setIsChanged(false)
        }
    }, [changes, setIsChanged])
    // useEffect(() => {
    //     if (Object.keys(values).length > 2) {
    //         if (mode === ModeType.EDIT) {
    //             checkChanged()
    //
    //         }
    //     }
    // }, [values])
    useEffect(() => {
        if (content && id) {
            setMode(ModeType.EDIT)
            const local = content.filter(c => c.id === Number(id))
            if (local.length > 0) {
                setPoem(local[0])
            }
        }
    }, [id, content])

    useEffect(() => {
        if (categories) {
            const local = []
            const keys = Object.keys(categories)
            for (const key of keys) {
                local.push({key, text: categories[key], value: key})
            }
            setOptions(local)
            if (mode === ModeType.ADD) {
                const category = content.filter(s => s.category === keys[0])
                const {max} = getContentMinMaxId(category, 'idInCategory')
                console.log('max inCat', max)
                setMinNewIdInCategory(max + 1)
                setValues({category: keys[0], idInCategory: max + 1})
            } else {
                const {id, idInCategory, authDate, category, content, explanation} = poem
                setValues({authDate, category, id, idInCategory, content, explanation})
            }
        }
    }, [categories, mode, content, poem])

    useEffect(() => {
        if (content) {
            const {max} = getContentMinMaxId(content, 'id')
            setMinNewId(max + 1)
            setValues({id: max + 1})
        }
    }, [content])

    const checkChanged = () => {
        let isChangedLocal = false
        // const changes = {}
        //exei alajei to id
        if (values.id !== poem.id) {
            //TODO check an yparxei idi ayto to id
            if (content.filter(s => s.id === values.id).length === 1) {
                //yparxei idi! error
                return console.log('υπάρχει κέιμενο με αυτό το id', values.id)
            }
            const {id} = values
            console.log({...changes, id})
            setChanges(v => {
                console.log(v)
                return {...changes, id}
            })
            isChangedLocal = isChangedLocal || true
        }
        //exei allaksei to idInCategory
        if (values.idInCategory !== poem.idInCategory) {
            if (content.filter(s => s.category === poem.category).filter(s => s.idInCategory === values.idInCategory).length === 1) {
                //yparxei idi! error
                return console.log('υπάρχει κέιμενο με αυτό το id στην κατηγορία', values.idInCategory)
            }
            const {idInCategory} = values
            setChanges({...changes, idInCategory})
            isChangedLocal = isChangedLocal || true
        }

        //exei allakse i authDate
        if (values.authDate !== poem.authDate) {
            console.log('values.authdate', values.authDate, poem.authDate)
            const {authDate} = values
            setChanges({...changes, authDate})
            isChangedLocal = isChangedLocal || true
        }

        if (values.content.trim() !== '' && values.content !== poem.content) {
            changes.content = values.content
            isChangedLocal = isChangedLocal || true
        }

        if (values.explanation && values.explanation.trim() !== '' && values.explanation !== poem.explanation) {
            changes.explanation = values.explanation
            isChangedLocal = isChangedLocal || true
        }

        if (values.category !== poem.category) {
            changes.category = values.category
            isChangedLocal = isChangedLocal || true
        }

        setIsChanged(isChangedLocal)
        if (isChangedLocal || isChanged) console.log('Changes', {
            ...changes,
            date: DateTime.local().toISO({includeOffset: false, format: 'basic'})
        })
    }


    // console.log('values ', Object.keys(values), values)
    // if (Object.keys(values) < 3) return null
    return (
        <Container>
            <div className={styles.addPoemContainer}>
                {mode === ModeType.EDIT ? <h3>Επεξεργασία καταχώρισης</h3> : <h3>Προσθήκη καταχώρισης</h3>}
                <Form>
                    {isChanged && <div><h4>Υπάρχουν αλλαγές</h4> <textarea value={JSON.stringify(changes)} readOnly/>
                    </div>}
                    <Form.Group widths="equal">
                        <Form.Field
                            control={Input}
                            label="Γενικός αριθμός καταχώρησης"
                            type={'number'}
                            width={"3"}
                            min={minNewId}
                            value={values?.id || ''}
                            onChange={handleChange}
                            name="id"
                        />
                        <Form.Field
                            control={Input}
                            label="Αριθμός καταχώρησης Κατηγορίας"
                            type={'number'}
                            width={"3"}
                            min={minNewIdInCategory}
                            value={values?.idInCategory || ''}
                            onChange={handleChange}
                            name="idInCategory"
                        />
                        <Form.Field
                            control={Input}
                            label="Ημερομηνία συγγραφής"
                            type={'date'}
                            width={"3"}
                            value={values.authDate || ''}
                            onChange={handleChange}
                            name="authDate"
                        />
                    </Form.Group>
                    <Form.Field
                        control={Select}
                        options={options}
                        label="Κατηγορία"
                        placeholder={'επιλογή κατηγορίας...'}
                        name="category"
                        value={values.category || ''}
                        onChange={(e, {value}) => {
                            const category = content.filter(s => s.category === value)
                            const {min, max} = getContentMinMaxId(category, 'idInCategory')
                            console.log(min, max)
                            setValues({...values, category: value, idInCategory: max + 1})
                            setMinNewIdInCategory(max + 1)
                            if (value !== poem['category']) {
                                setChanges({...changes, category: value})
                                setIsChanged((c) => c || true)
                            } else {
                                const lC = clonedeep(changes)
                                delete lC['category']
                                setChanges(lC)
                            }
                        }
                        }

                    />
                    <Form.Field
                        control={TextArea}
                        label="Κείμενο"
                        name={'content'}
                        value={values.content || ''}
                        onChange={handleChange}
                        onFocus={(e) => auto_grow(e.target)}
                    />
                    <Form.Field
                        control={TextArea}
                        label="Επεξήγηση"
                        name={'explanation'}
                        value={values.explanation !== null ? values.explanation : ''}
                        onChange={handleChange}
                        onFocus={(e) => auto_grow(e.target)}
                    />
                    <Form.Field
                        control={Button}
                        disabled={ModeType.ADD ? !isReady : !isChanged}
                        onClick={
                            (e) => {
                                e.preventDefault()
                                if (ModeType.ADD) {
                                    content.push(values)
                                    console.log(values, content)
                                } else {


                                    if (isChanged) {
                                        console.log('send dispatch', values, '\nchanges', changes)

                                        const oldChanges = poem.changes ? poem.changes : []
                                        const newValues = clonedeep(values)
                                        oldChanges.push({...changes, changeTime: DateTime.now().set({milliseconds: 0}).toISO({
                                                format: 'basic',
                                                includeOffset: false,
                                                suppressMilliseconds: true
                                            })})
                                        newValues.changes = oldChanges
                                        dispatch({
                                            type: 'EDIT_POEM',
                                            payload: {oldId: poem.id, newPoem: newValues,}
                                        })
                                        setIsChanged(false)
                                    } else {
                                        console.log('nothing change')
                                    }

                                }
                            }
                        }>{ModeType.ADD ? 'Εισαγωγή κειμένου' : 'Καταχώρηση αλλαγών'}</Form.Field>
                </Form>
            </div>
        </Container>
    )
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight + 10) + "px";
}

export default AddPoem
