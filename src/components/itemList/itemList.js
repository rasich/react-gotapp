import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

class ItemList extends Component {

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
    const {data} = this.props;
    const items = this.renderItems(data);
    
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}

ItemList.defaultProps = {
  onItemSelected: () => {}
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func
}

const withData = (View) => {
  return class extends Component{

    state = {
      data: null,
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
        .then((data) => {
          this.setState({
            data
          })
        })
    }

    render() {
      if (this.state.error) {
        return <ErrorMessage/>
      }
  
      const {data} = this.state;
  
      if (!data) {
        return <Spinner/>
      }

      return <View {...this.props}  data={data}/>
    }
  };
}

export default withData(ItemList)