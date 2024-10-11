import axios from "axios";
import { backendBaseuRL } from "../shared/constant";

interface GasEstimationTx {
  from: string;
  to: string;
  value: string;
}

export const getGasPriceEstimation = async (transaction: GasEstimationTx) => {
  try {
    const response = await axios.post(
      `${backendBaseuRL}ethereum/get-transaction-gas-estimation`,
      transaction
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getErcTransferGasPriceEstimation = async ({
  contractAddress,
  recipient,
  value,
}: {
  contractAddress: string;
  recipient: string;
  value: string;
}) => {
  try {
    const url = `${backendBaseuRL}ethereum/get-erc-20-transfer-estimation-gas-price?contractAaddress=${contractAddress}&value=${value}&to=${recipient}`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
