import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


export default class ItemList extends Component {

  state = {
    itemList: null,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  componentDidMount() {
    const {getData} = this.props;

    getData()
      .then((itemList) => {
        this.setState({
          itemList
        })
      })
  }

  renderItems(arr) {
    return arr.map((item) => {
      const {id} = item;
      const label = this.props.renderItem(item);

      return (
        <li 
          alt={id}
          key={id}
          className="list-group-item"
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      )
    })
  }

  render() {

    if (this.state.error) {
      return <ErrorMessage/>
    }

    const {itemList} = this.state;

    if (!itemList) {
      return <Spinner/>
    }
    
    const items = this.renderItems(itemList);
    
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}