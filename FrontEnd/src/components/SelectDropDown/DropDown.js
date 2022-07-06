import React from 'react'
import Select from 'react-select'

const options = [
  { value: {type:'chocolate', id:'23',name:'asdasd'}, label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]



const DropDown = (props) => {
  // console.log(props.defaultValue)

  return props.defaultValue ? (<Select value={props.defaultValue ? props.defaultValue : ''} onChange={props.valueUpdate} options={props.options ? props.options : options} />) : (<Select onChange={props.valueUpdate} options={props.options ? props.options : options}  />)
}
// value default value

export default DropDown;