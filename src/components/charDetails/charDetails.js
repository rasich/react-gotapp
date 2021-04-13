import React, {Component} from 'react';
import './charDetails.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


export default class CharDetails extends Component {

  gotService = new GotService();

  state = {
    char: null,
    loading: true,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    }) 
  }

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar() {
    const {charId} = this.props;
    if (!charId) {
      return;
    }
    this.setState({
      loading: true
    })

    this.gotService.getCharacter(charId)
      .then(this.onCharLoaded);
  }
  
  render() {

    if (this.state.error) {
      return <ErrorMessage/>
    }

    if (!this.state.char) {
      return <span className='select-error'>Please select a character</span>
    }

    const {char, loading} = this.state;


    const content = loading ? <Spinner/> : <View char={char}/>;

    return (
      <div className="char-details rounded">
        {content}
      </div>
    );
  }
}

const View = ({char}) => {
  const {name, gender, born, died, culture} = char;
  
  return (
    <>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Gender</span>
          <span>{gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Born</span>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Died</span>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span className="term">Culture</span>
          <span>{culture}</span>
        </li>
      </ul>
    </>
  )
}