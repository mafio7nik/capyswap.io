import axios from "axios"

async function GetTokenPrice(tokenadressA:string, tokenadressB:string) {
    const res = await axios.get(`http://localhost:3001/tokenPrice`, {
        params: {addressOne: tokenadressA, addressTwo: tokenadressB}
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
      return res;
}
export default GetTokenPrice;