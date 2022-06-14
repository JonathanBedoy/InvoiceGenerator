import React from 'react';
// import style from './Button.module.css';
import Button from 'react-bootstrap/Button';

const button = props => {

  let btnVariant = props.outline ? 'outline-' : '';
  btnVariant += props.type;
  return(
    <Button className={props.className} onClick={props.click} variant={btnVariant}>{props.children}</Button>
  );
}

export default button;