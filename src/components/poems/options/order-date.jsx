import React from "react";
import {useDispatch, useSelector} from "react-redux"
import {Checkbox, Form} from "semantic-ui-react"
import {getString, getOrder} from '../../../utils.js'

const OrderDate = () => {
  const dispatch = useDispatch()
  const order = useSelector(state => state.order)

  const handleChange = (evt, {value}) => {
    dispatch({type:'SET_ORDER', payload: getOrder(value)})
  }
  return (
    <div>
      <Form>
        <Form.Field>
         Χρονολογκή ταξινόμηση
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Αύξουσα"
            name="checkboxRadioGroup"
            value="asc"
            checked={getString(order) === 'asc'}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Φθίνουσα"
            name="checkboxRadioGroup"
            value="desc"
            checked={getString(order) === 'desc'}
            onChange={handleChange}
          />
        </Form.Field>
      </Form>
    </div>
  )
}

export default OrderDate



