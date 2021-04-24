import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import PropTypes from 'prop-types';

function ItemList({getData, onItemSelected, renderItem}) {

  const [itemList, updateList] = useState([]);

  useEffect(() => {
    getData()
      .then((data) => {
        updateList(data)
      })
  }, [])

  function renderItems(arr) {
    return arr.map((item) => {
      const {id} = item;
      const label = renderItem(item);

      return (
        <li 
          alt={id}
          key={id}
          className="list-group-item"
          onClick={() => onItemSelected(id)}
        >
          {label}
        </li>
      )
    })
  }

  if (!itemList) {
    return <Spinner/>
  }
  
  const items = renderItems(itemList);
  
  return (
    <ul className="item-list list-group">
      {items}
    </ul>
  );
}

export default ItemList;

ItemList.defaultProps = {
  onItemSelected: () => {}
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func
}