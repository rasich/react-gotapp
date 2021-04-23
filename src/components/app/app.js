import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import {CharacterPage, BooksPage, HousesPage, BooksItem, ErrorPage} from '../pages';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import './app.css';

export default class App extends Component {
  state = {
    showRandomChar: true,
    error: false
  };

  componentDidCatch() {
    console.log('error');
    this.setState({
      error: true
    })
  }

  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar
      }
    })
  }

  render() {
    const char = this.state.showRandomChar ? <RandomChar/> : null;

    if (this.state.error) {
      return <ErrorMessage/>
    }
    
    return (
      <Router>
        <div className='app'> 
          <Container>
            <Header/>
          </Container>
          <Container>
            <Row>
              <Col lg={{size: 5, offset: 0}}>
                  {char}
                  <button
                    className='toggle-btn'
                    onClick={this.toggleRandomChar}
                  >
                    Toggle random character
                  </button>
              </Col>
            </Row>

            <Switch>
              <Route path='/' exact component={() => <h1 style={{color: 'white', textAlign:'center'}}>Welcome to GOT DB</h1>}/>
              <Route path='/characters' exact component={CharacterPage}/>
              <Route path='/houses' exact component={HousesPage}/>
              <Route path='/books' exact component={BooksPage}/>
              <Route path='/books/:id' render={
                ({match}) => {
                  const {id} = match.params;
                  return <BooksItem bookId={id}/>
                }
              }/>
              {/* <Route path='/books/:id' render={ */}
                {/* ({match}) => <BooksItem {...match}/> */}
              {/* }/> */}
              <Route path="/*" component={ErrorPage}/>
            </Switch>

          </Container>
        </div>
      </Router>
    );
  }
};