import { ethers, parseEther } from "ethers";
import { backendBaseuRL } from "../shared/constant";
import { RPC_URL } from "../shared/constant";
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

export const sendEth = async ({
  recipient,
  value,
  privateKey,
}: {
  recipient: string;
  value: string;
  privateKey: string;
}) => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(privateKey, provider);
  const tx = await signer.sendTransaction({
    value: parseEther(value),
    to: recipient,
  });

  tx.wait(2);

  return tx;
};

export const sendEthereumToken = async ({
  recipient,
  value,
  privateKey,
  contractAddress,
  address,
}: {
  recipient: string;
  value: string;
  privateKey: string;
  contractAddress: string;
  address: string;
}) => {
  const fetchAbi = await axios.get<string>(
    `${backendBaseuRL}tokens/get-abi/?contractAddress=0xdAC17F958D2ee523a2206206994597C13D831ec7`
  );

  const abi = JSON.parse(fetchAbi.data);
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(contractAddress, abi, signer);
  const decimals = parseInt(await contract.decimals());

  const formatValue = parseInt(value) * 10 ** decimals;

  console.log(formatValue);

  const transaction = await contract.transfer(recipient, formatValue);
  await transaction.wait();
};

233;
