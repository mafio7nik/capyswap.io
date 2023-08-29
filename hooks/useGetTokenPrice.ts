import axios from "axios";

async function GetTokenPrice(tokenaddressA: string | undefined, tokenaddressB: string | undefined, chainname: string | undefined) {
  try {
    const res = await axios.get(`https://capyswap-api-io.onrender.com/tokenPrice`, {
      params: { addressOne: tokenaddressA, addressTwo: tokenaddressB, chainname: chainname },
    });

    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    } else {
      throw new Error(`Received non-200 status: ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching token price:", error);
    throw error; // Reject the promise with the error
  }
}

export default GetTokenPrice;
