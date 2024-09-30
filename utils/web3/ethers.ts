import { Any } from "typeorm";
import { backendBaseuRL } from "../shared/constant";
import axios from "axios";
//fetch get the user's balance from a given specific ERC2030 token
export const getBalance = async ({
  contractAddress,
  usersAddress,
}: {
  contractAddress: string;
  usersAddress: string;
}) => {
  try {
    const abi = await axios.get(
      `${backendBaseuRL}tokens/get-abi/?contractAddress=0xdAC17F958D2ee523a2206206994597C13D831ec7`
    );

    const balanceResponse = await axios.post(
      `${backendBaseuRL}tokens/get-balance`,
      {
        abi: abi.data,
        contractAddress: contractAddress,
        walletAddress: usersAddress,
      }
    );

    return balanceResponse.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
