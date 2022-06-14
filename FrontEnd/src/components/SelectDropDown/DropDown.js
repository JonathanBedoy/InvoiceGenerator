import React from 'react'
import Select from 'react-select'

const options = [
  { value: {type:'chocolate', id:'23',name:'asdasd'}, label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const DropDown = (props) => {

  return <Select onChange={props.valueUpdate} options={props.options ? props.options : options} />
}

export default DropDown;