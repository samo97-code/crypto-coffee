import {useState} from 'react';

const useEthPrice = () => {
    const [ethPrice, setEthPrice] = useState(0);

    const fetchEthPrice = async () => {
        try {
            const res = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
                {cache: 'no-store'}
            );

            if (!res.ok) {
                throw new Error('Failed to fetch ETH price');
            }

            const data = await res.json();
            if (data.ethereum.usd) {
                setEthPrice(data.ethereum.usd)
            }

            return data.ethereum.usd
        } catch (e) {
            console.error(e)
        }
    }

    return {ethPrice, fetchEthPrice}
};

export default useEthPrice;
