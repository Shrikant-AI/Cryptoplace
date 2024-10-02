import { createContext, useEffect, useState } from "react";


export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]); 
  const [currency, setCurrency] = useState({
    name: "USD",
    symbol: "$",
  });

  // Fetch all coins from the API
  const fetchAllCoins = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-UbNDRwseWDBYM94v4Ubpp7Lv', // Using your API key
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await response.json();
      setAllCoins(data);
    } catch (err) {
      console.error('Error fetching coins:', err);
    }
  };

  // Fetch coins when the component mounts or when the currency changes
  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  // Context value to be provided to all children components
  const contextValue = {
    allCoins, // Note the plural name
    currency,
    setCurrency,
  };

  // Return the provider with the children wrapped inside
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
