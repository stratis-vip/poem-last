import React, {useEffect, useState} from "react";
import {getOrder, TypeOrder} from "../../../utils";
import {setOrder} from "../../../features/order-slice";
import {setCategory} from "../../../features/current-category-slice";
import {useDispatch, useSelector} from "react-redux";
import styles from './search.module.css'

import {Button, Input, Modal, Select} from 'semantic-ui-react'

const ordOptions = [
    {key: 'asc', text: 'Αύξουσα', value: 'asc'},
    {key: 'desc', text: 'Φθίνουσα', value: 'desc'},
]

const Search = ({search, setSearch}) => {
    const [open, setOpen] = useState(false)
    const category = useSelector(s => s["currentCategory"])
    const categories = useSelector(s => s["categories"])
    const dispatch = useDispatch()
    const order = useSelector(s => s["order"])
    const [options, setOptions] = useState([{key: 'all', text: 'Σε όλες τις κατηγορίες', value: 'all'}])

    useEffect(() => {
        if (categories) {
            const local = [{key: 'all', text: 'Σε όλες τις κατηγορίες', value: 'all'}]
            categories.map(category => local.push({key:category.id, text: category.description, value: category.id}))
            setOptions(local)
        }
    }, [categories])

    const handleChangeOrder = (evt, {value}) => {
        dispatch(setOrder(getOrder(value)))
    }
    const handleChangeCategory = (evt, {value}) => {
        dispatch(setCategory(value))
    }

    return (
        <>
            <Button color={"green"} onClick={() => setOpen(true)}>
                Αλλαγή
            </Button>

            <Modal
                size={'small'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Modal.Header>Επιλογές ταξινόμησης και αναζήτησης</Modal.Header>
                <Modal.Content>
                    <div className={styles.centerFlex}>
                        <div>
                            <label>Κείμενο αναζήτησης: <Input fluid type="text"
                                                              placeholder="κείμενο αναζήτησης..."
                                                              value={search || ''}
                                                              onChange={(evt)=>{evt.target.value.trim().length === 0 ? setSearch(null):setSearch(evt.target.value)}}
                            /></label>
                        </div>
                        <div className={styles.optionsFlexNB}><label>Κατηγορία: <Select options={options}
                                                                                      defaultValue={category}
                                                                                      onChange={handleChangeCategory}/></label>

                            <label>Ταξινόμηση: <Select compact options={ordOptions}
                                                       defaultValue={order === TypeOrder.desc ? "desc" : "asc"}
                                                       onChange={handleChangeOrder}/></label>
                        </div>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <div className={styles.optionsFlexNT}>
                        <Button positive type="submit" onClick={() => setOpen(false)}>Αναζήτηση</Button>
                        <Button negative onClick={() => setOpen(false)}>
                            Ακύρωση
                        </Button>
                    </div>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default Search