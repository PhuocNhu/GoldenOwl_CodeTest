import nike from './assets/nike.png';
import trash from './assets/trash.png'
import data from './data/shoes.json'
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [shoes,setShoes] = useState([data.shoes]);
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  const storedTotal = JSON.parse(localStorage.getItem('total'));
  const storedAmounts = JSON.parse(localStorage.getItem('amounts')) ||  shoes[0].map(() => 0) ;
  const storedChecks = JSON.parse(localStorage.getItem('checks')) ||  shoes[0].map(() => false) ;
  const [checks, setChecks] = useState(storedChecks);
  const [amounts, setAmounts] = useState(storedAmounts);
  const [total, setTotal] = useState(storedTotal || 0);
  const [cart, setCart] = useState(storedCart);
  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart))
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('total',JSON.stringify(total))
  }, [total]);
  useEffect(() => {
    localStorage.setItem('amounts',JSON.stringify(amounts))
  }, [amounts]);
  useEffect(() => {
    localStorage.setItem('checks',JSON.stringify(checks))
  }, [checks]);
  const handleAddClick = (idx) => {
      setCart([...cart, shoes[0][idx]])
      setTotal(total + shoes[0][idx].price)
      const newAmount = [...amounts];
      newAmount[idx] = newAmount[idx] + 1;
      setAmounts(newAmount);
      if (!checks[idx]) {
          const newCheck = [...checks];
          newCheck[idx] = true;
          setChecks(newCheck);
      }
  };
  const handleRemoveClick = (idx) => {
    const indexOrig =  shoes[0].findIndex((item) => item.id === cart[idx].id)
    setTotal(total - cart[idx].price * amounts[indexOrig])
    const newCheck = [...checks];
    newCheck[indexOrig] = false;
    setChecks(newCheck);
    const newAmount = [...amounts];
    newAmount[indexOrig] = 0;
    setAmounts(newAmount);
    const newCart = cart.filter((item, index) => index !== idx);
    setCart(newCart)
  };
  const handlePlusClick = (idx) => {
    const newAmount = [...amounts];
    const indexOrig =  shoes[0].findIndex((item) => item.id === cart[idx].id)
    newAmount[indexOrig] = newAmount[indexOrig] + 1;
    setAmounts(newAmount);
    setTotal(total + cart[idx].price)
  };
  const handleMinusClick = (idx) => {
    const newAmount = [...amounts];
    const indexOrig =  shoes[0].findIndex((item) => item.id === cart[idx].id)
    newAmount[indexOrig] = newAmount[indexOrig] - 1;
    if(newAmount[indexOrig] === 0){
      handleRemoveClick(idx);
      return;
    }
    setAmounts(newAmount);
    setTotal(total - cart[idx].price);
  };
  return (
    <body>
      <div className="App_mainContent_12BYb">
        <div className='App_card_38zmH'>
          <div className='App_cardTop_3hHIG'>
            <img src={nike} className='App_cardTopLogo_2ho9K'></img>
          </div>
          <div className='App_cardTitle_29nyq'>
            Our Products
          </div>
          <div className='App_cardBody_1tfYc'>
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
                    <div className='App_shopItemButton_23FO1' onClick={() => handleAddClick(idx)} disabled={checks[idx]} style={{pointerEvents: checks[idx]? 'none' : 'auto'}}>
                    {!checks[idx] ? <p>ADD TO CART</p>: <div class="App_shopItemButtonCover_1bH2R"><div class="App_shopItemButtonCoverCheckIcon_18IzJ"></div></div>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='App_card_38zmH'>
          <div className='App_cardTop_3hHIG'>
            <img src={nike} className='App_cardTopLogo_2ho9K'></img>
          </div>
          <div className='App_cardTitle_29nyq'>
            Your cart
            <span className='App_cardTitleAmount_17QFR'>${total.toFixed(2)}</span>
          </div>
          <div className='App_cardBody_1tfYc'>
            {cart.length === 0 ? 
            <div className='App_cartEmpty_xgWCN'>
              <p className='App_cartEmptyText_2mtqJ'>Your cart is empty.</p>
            </div>
            :
              cart.map((shoe,idx) =>{
                return(
                  <div>
                    <div className='App_cartItem_lfA9I cart-list-enter-active cart-list-enter-to'>
                      <div className='App_cartItemLeft_1HqDk cartItemLeft'>
                        <div className='App_cartItemImage_1rLvq cartItemImage' style={{backgroundColor: shoe.color}}>
                          <div className='App_cartItemImageBlock_wRE4E'>
                            <img src={shoe.image}></img>
                          </div>
                        </div>

                      </div>
                      <div className='App_cartItemRight_2LNcC cartItemRight'>
                        <div className='App_cartItemName_3he6M cartItemName'>
                          {shoe.name}
                        </div>
                        <div className='App_cartItemPrice_R0sr2 cartItemPrice'>
                          ${shoe.price}
                        </div>
                        <div className='App_cartItemActions_13kia cartItemActions'>
                          <div className='App_cartItemCount_1GCCN cartItemCount'>
                            <div className='App_cartItemCountButton_Gr8VG' onClick={() => handleMinusClick(idx)}>-</div>
                            <div className='App_cartItemCountNumber_1Evq9'>{amounts[shoes[0].findIndex((item) => item.id === shoe.id)]}</div>
                            <div className='App_cartItemCountButton_Gr8VG' onClick={() => handlePlusClick(idx)}>+</div>
                          </div>
                          <div className='App_cartItemRemove_1GiLR cartItemRemove'>
                            <img src={trash} onClick={() => handleRemoveClick(idx)}></img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
