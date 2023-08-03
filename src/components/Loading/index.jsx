import PropTypes from 'prop-types';
import './style.scss';
import data from '../../data/shoes.json';
import React, { useState, useEffect } from 'react';

Loading.propTypes = {
    
};

function Loading(props) {
    const [shoes,setShoes] = useState([data.shoes])
    const [checks, setChecks] = useState(shoes[0].map(() => false))
    const handleClick = (idx) => {
        if (!checks[idx]) {
            const newCheck = [...checks];
            newCheck[idx] = true;
            setChecks(newCheck);
        }
    };
    return (
        <div>
            {shoes[0].map((shoe,idx) =>{
            return(
              <div className='App_shopItem_3FgVU'>
                <div className='App_shopItemImage_341iU' style={{backgroundColor: shoe.color}}>
                  <img src={shoe.image}></img>
                </div>
                <div className='App_shopItemName_1_FJR'>{shoe.name}</div>
                <div className='App_shopItemDescription_1EIVK'>{shoe.description}</div>
                <div className='App_shopItemBottom_3401_'>
                  <div className='App_shopItemPrice_2SLiG'>${shoe.price}</div>
                  <div className='App_shopItemButton_23FO1' onClick={() => handleClick(idx)} disabled={checks[idx]} style={{pointerEvents: checks[idx]? 'none' : 'auto'}}>
                  {!checks[idx] ? <p>ADD TO CART</p>: <div class="App_shopItemButtonCover_1bH2R"><div class="App_shopItemButtonCoverCheckIcon_18IzJ"></div></div>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
    );
}

export default Loading;