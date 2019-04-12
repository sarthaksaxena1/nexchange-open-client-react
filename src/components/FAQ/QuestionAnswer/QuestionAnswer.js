import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ScrollToElement from 'scroll-to-element';

import styles from './QuestionAnswer.scss';

class QuestionAnswer extends Component {
  state = { open: false };

  componentDidMount() {
    const browserPath = window.location.pathname.split('/')[2] ? window.location.pathname.split('/')[2].toLowerCase().trim() : null;
    /* eslint max-len: ["error", { "code": 200 }] */ 
    const questionPath = this.props.t(`faq.${this.props.id}`).replace(/ /g, '-').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase().trim();
    if(browserPath === questionPath) {
      this.setState({open: true});
      document.getElementById(`faq.${this.props.id}`).scrollIntoView();;
    }
  }

  onClick = () => {
    this.setState({ open: !this.state.open });
    window.gtag('event', 'Question open', {event_category: 'FAQ', event_label: `${this.props.answer}`});
  };

  render() {
    return (
      <div className={`question-answer ${styles.container}`} id={`faq.${this.props.id}`}>
        <div className={`${styles.question}`} onClick={this.onClick} data-test="question-opener">
          <i className={`far fa-${this.state.open ? 'minus' : 'plus'}-square fa-2x`} aria-hidden="true" />
          <h3>
            {this.props.t(`faq.${this.props.id}`)}
          </h3>
        </div>
        <div className={`${this.state.open ? `${styles.answer} ${styles.active}` : `${styles.answer}`}`}>{this.props.answer}</div>
        <hr />
      </div>
    );
  }
}

export default translate()(QuestionAnswer);