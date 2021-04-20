import React, {Component} from 'react';
import './itemDetails.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
  return(
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  )
}
export {Field};

export default class ItemDetails extends Component {

  gotService = new GotService();

  state = {
    item: null,
    loading: true,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    this.setState({
      item,
      loading: false
    }) 
  }

  updateItem() {
    const {getData, itemId} = this.props;
    if (!itemId) {
      return;
    }
    this.setState({
      loading: true
    })

    // this.gotService.getCharacter(itemId)
    //   .then(this.onItemLoaded);

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          loading: false
        })
      })
  }
  
  render() {

    if (this.state.error) {
      return <ErrorMessage/>
    }

    if (!this.state.item) {
      return <span className='select-error'>Please select item in the list</span>
    }

    const {item, loading} = this.state;


    if (loading) {
      return (
        <div className="char-details rounded">
          <Spinner/>
        </div>
      )
    } 
      
    const {name} = item;

    return (
      <div className="char-details rounded">

        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {
            React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, {item})
            })
          }
        </ul>
      </div>
    );
  }
}