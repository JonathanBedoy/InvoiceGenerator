import React, { useEffect, useState } from 'react';
import styles from './AddToInventory.module.css';
import InputField from '../../components/UI/InputField/InputField';
// import BackButton from '../../components/UI/BackButton/BackButton';
import Container from 'react-bootstrap/Container';
import Button from '../../components/UI/Button/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { withRouter } from 'react-router-dom';
import SecondaryNavBar from '../../components/UI/NavigationBar/SecondaryNavBar/SecondaryNavBar';
// import { useDispatch } from 'react-redux';
// import { toolActions } from '../../store';


const AddToInventory = (props) => {

  // console.log(props.attributesNeeded)

  // const dispatch = useDispatch();
  // const [textInput, setTextInput] = useState('')
  const [formInputs, setFormInputs] = useState({})
  const [attributesNeeded, setAttributesNeeded] = useState(Object.keys(props.attributesNeeded))

  // sets the inputs we need for the appropriate inputs passed through props
  useEffect(() => {
    setFormInputs( a => {
      const b = {}
      attributesNeeded.forEach(element => {
        
        b[element.charAt(0).toLowerCase() + element.slice(1)] = ''
      });
      return{
        ...a,
        ...b
      }
    })
  }, [attributesNeeded])

  useEffect(() => {
    setAttributesNeeded( a => Object.keys(props.attributesNeeded))
  }, [props.attributesNeeded])
  


  const addItemToInventory = () => {

    let goodToAdd = true
    attributesNeeded.forEach( ele => {
      if(formInputs[ele] === '') {
        // TODO: add message saying you need to fill it out
        if(props.attributesNeeded[ele] === 'number') {
          goodToAdd = false
        }
        // setFormInputs(state => {
        //   return {
        //     ...state,
        //     [ele]: ''
        //   }
        // })
      }
    })
    if (!goodToAdd) return 
    // dispatch(toolActions.addTool())
    props.history.push(props.redirect)
    props.btnClick(formInputs)
  }


  const updateInput = (newVal, info) => {
    setFormInputs( a => {
      a[info.label.charAt(0).toLowerCase() + info.label.slice(1)] = newVal
      return {
        ...a
      }
    })
  }

  let fieldsOfInput = attributesNeeded.map(item => {
    return (
      <InputField type={props.attributesNeeded[item]} label={item} key={item} value={formInputs[item.toLowerCase()]} valueUpdate={updateInput} />
    )
  })

  return (
    <Container className={'m-0 p-0'}>
      <SecondaryNavBar 
        back={props.redirect}
        title={props.title}
      />
      {/* <Row className={styles.TitleContainer}>
        <Col xs={{ span: 1, offset: 0 }} md={{ span: 1, offset: 0 }} lg={{ span: 1, offset: 1 }}>
          <BackButton />
        </Col>
        <Col className={styles.Title} xs={{ span: 5, offset: 2 }} md={{ span: 5, offset: 2 }} lg={{ span: 5, offset: 2 }}>
          <span >{props.title}</span>
        </Col>
      </Row> */}
      <Row className={styles.addToInventory}>
        <Col lg={{ span: 8, offset: 2 }}>
          {fieldsOfInput}
        </Col>
      </Row>
      <Row className={styles.addToInventory}>
        <Col md={{ span: 4, offset: 4 }} className={styles.AddButton}>
          <Button click={addItemToInventory} outline type='success'>{props.addButton}</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(AddToInventory);