import React, { Component } from 'react';
import styles from './BackButton.module.css';
import { withRouter } from 'react-router-dom';
import { IoMdArrowBack, IoMdArrowRoundBack } from 'react-icons/io';

class BackButton extends Component {

  state = {
    hovering: false
  }

  changeIcon (cond) {
    this.setState({ hovering: cond });
  }

  goBack () {
    // this.props.history.go('/inventory')
    this.props.redirect ? this.props.history.push(this.props.redirect) : this.props.history.goBack();
  }

  render() {
    let iconToShow = !this.state.hovering ? <IoMdArrowBack /> : <IoMdArrowRoundBack />
    return (
      <span onClick={() => this.goBack()} className={styles.BackButton} onMouseEnter={() => this.changeIcon(true)} onMouseLeave={() => this.changeIcon(false)}>
        {iconToShow}
      </span>
    );
  }
}

export default withRouter(BackButton);