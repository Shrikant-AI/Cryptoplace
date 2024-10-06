import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'

const Home = () => {

  const {allCoins , currency} = useContext(CoinContext);
  const [displayCoin , setDisplayCoin] = useState([])
  const [input , setInput] = useState('')


  useEffect(() => {
    console.log('allCoin:', allCoins); 
    setDisplayCoin(allCoins || []);
  }, [allCoins]);
  
const inputHandler =(event)=>{
  setInput(event.target.value)

}

const searchHandler = async(event) => {
  event.preventDefault();
  const coins =await allCoins.filter((item)=>{
    return item.name.toLowerCase().includes(input.toLowerCase())
  })
  setDisplayCoin(coins)
}

  return (
    <div className='home'>

          <div className="hero">
              <h1>Largest <br/> Crypto Marketplace</h1>
              <p>Welcome to worlds largest cryptocurrency market. Sign up to explore more about cryptos</p>

              <form onSubmit={searchHandler}>
                  <input type="text" onChange={inputHandler} value={input} placeholder='Search Crypto...' required />
                  <button type="submit">Search</button>
              </form>

          </div>

          <div className="crypto-table">
              <div className="table-layout">
                <p>#</p>
                <p>Price</p>
                <p>Coin</p>
                <p style={{textAlign:"center"}}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
              </div>
              {
                displayCoin.slice(0,10).map((item )=>(
                  <div className="table-layout" key={item.id}>
                    <p>{item.market_cap_rank}</p>

                    <div>
                      <img src={item.image} alt={item.name + " image"}/>
                      <p>{item.name +"-"+ item.symbol}</p>
                    </div>

                    <p>{currency.symbol}{item.current_price.toLocaleString()}</p>

                    <p className={item.market_cap_change_percentage_24h>0?"green":"red"}>
                    {Math.floor( item.market_cap_change_percentage_24h*100)/100}</p>

                    <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>

                  </div>
                ) )
              }
          </div>
    </div>
  )
}

export default Home
