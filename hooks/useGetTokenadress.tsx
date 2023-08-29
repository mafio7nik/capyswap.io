import { Token } from '../hooks/useFetchTokens'

export default async function useGetTokenAddress(tokenlist: Token[], selectedToken: string, chainid: number) {
    const defaultToken = await tokenlist.find(token => token.symbol === selectedToken && token.chainId === chainid);
    const tokenaddress = await defaultToken?.address;
    console.log('tokenadress in function:', tokenaddress) // Default to an empty string if address is undefined
    return tokenaddress;
};