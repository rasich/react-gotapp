import React, { Component } from 'react';
import GotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';
import {ErrorPage} from './';


export default class BooksItem extends Component {
  gotService = new GotService();

  render() {

    let answer;
    if (+this.props.bookId) {
      answer = (
        <ItemDetails 
          itemId={this.props.bookId}
          getData={this.gotService.getBook}
        >
          <Field field='numberOfPages' label='Number of pages'/>
          <Field field='publisher' label='Publisher'/>
          <Field field='released' label='Released'/>
        </ItemDetails> 
      )
    } else {
      answer = <ErrorPage/>
    }

    return(
      <>
      {answer}
      </>
    )
  }
}