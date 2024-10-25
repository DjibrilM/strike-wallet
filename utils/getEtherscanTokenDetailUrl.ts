const getUrl = (contractAddress?: string) => {
  return contractAddress
    ? `https://etherscan.io/token/${contractAddress}`
    : "https://etherscan.io/txs";
};

export default getUrl;
