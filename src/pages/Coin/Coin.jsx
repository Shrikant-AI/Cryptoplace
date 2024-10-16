import React from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'

const Coin = () => {
const coinId = useParams();

  return (
    <div className='coin'>
        {/* COIN : {coinId} */}
        COIN: {coinId} {/* Display the specific coinId */}
    </div>
  )
}

export default Coin


//CG-UbNDRwseWDBYM94v4Ubpp7Lv API key