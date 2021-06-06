import React from "react";
import {useCallback, useEffect, useState,} from "react"
import {useSelector} from "react-redux"
// import {useSelector} from "react-redux"
import {Checkbox, Form} from "semantic-ui-react"
// import {TypeOrder} from '../../../../src/utils.js'

const OrderCategory = (props) => {
  const cat= useSelector(s => s.categories)
  // const categories = []
  const {category, setCategory} = props
  const [categories,setCategories] = useState([])
  //
  // const categories =props.categories)
  useEffect(()=>{
    if (cat){
      setCategories(Object.keys(cat))
    }
  }, [cat, setCategories])

  const handleChange = useCallback((evt, {value}) => {
    setCategory(value)
  },[setCategory])

  const fillOptions = useCallback(() => {
    if (categories?.length === 0) return null
    return categories.map(c => <Form.Field key={c}>
        <Checkbox
          radio
          label={cat[c]}
          name="checkboxRadioGroup1"
          value={c}
          checked={category === c}
          onChange={handleChange}
        />
      </Form.Field>
    )
  },[category,categories,handleChange, cat])

  return (
    <div>
      <Form>
        <Form.Field>
          Ταξινόμηση κατά κατηγορία
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Όλες ο κατηγορίες"
            name="checkboxRadioGroup1"
            value="all"
            checked={category === 'all'}
            onChange={handleChange}
          />
        </Form.Field>
        {fillOptions()}
      </Form>
    </div>
  )
}

export default OrderCategory
