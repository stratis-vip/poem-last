import React, {useEffect, useState} from "react";
import {getOrder, TypeOrder} from "../../../utils";
import {setOrder} from "../../../features/order-slice";
import {setCategory} from "../../../features/current-category-slice";
import {useDispatch, useSelector} from "react-redux";
import styles from './search.module.css'

import {Button, Icon, Input, Label, Modal, Select} from 'semantic-ui-react'

function exampleReducer(state, action) {
    switch (action.type) {
        case 'close':
            return {open: false}
        case 'open':
            return {open: true, size: action.size}
        default:
            throw new Error('Unsupported action...')
    }
}

const ordOptions = [
    {key: 'asc', text: 'Αύξουσα', value: 'asc'},
    {key: 'desc', text: 'Φθίνουσα', value: 'desc'},
]
const Search = () => {
    const [state, dispatchModal] = React.useReducer(exampleReducer, {
        open: false,
        size: undefined,
    })
    const {open, size} = state

    const category = useSelector(s => s.currentCategory)
    const categories = useSelector(s => s.categories)
    const dispatch = useDispatch()
    const order = useSelector(s => s.order)
    const [options, setOptions] = useState([{key: 'all', text: 'Σε όλες τις κατηγορίες', value: 'all'}])


    useEffect(() => {
        if (categories) {
            const local = [{key: 'all', text: 'Σε όλες τις κατηγορίες', value: 'all'}]
            for (const key of Object.keys(categories)) {
                local.push({key, text: categories[key], value: key})
            }
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
            <Button color={"green"} onClick={() => dispatchModal({type: 'open', size: 'small'})}>
                Αλλαγή
            </Button>

            <Modal
                size={size}
                open={open}
                onClose={() => dispatchModal({type: 'close'})}
            >
                <Modal.Header>Επιλογές ταξινόμησης και αναζήτησης</Modal.Header>
                <Modal.Content>
                    <div className={styles.centerFlex}>
                        <div>
                            <label>Κείμενο αναζήτησης: <Input fluid type="text"
                                                              placeholder="κείμενο αναζήτησης..."/></label>
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
                        <Button positive type="submit" onClick={() => dispatchModal({type: 'close'})}>Αναζήτηση</Button>


                        <Button negative onClick={() => dispatchModal({type: 'close'})}>
                            Ακύρωση
                        </Button>
                    </div>
                </Modal.Actions>
            </Modal>
        </>
    )


}

export default Search