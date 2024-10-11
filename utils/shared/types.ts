export type CustomeBottomSheetRef = {
  close: () => void;
  open: () => void;
};

export enum TokenSelectionScreenActions {
  Send = "send",
  Receive = "receive",
  Buy = "buy",
  Sell = "sell",
  History = "history",
  Create = "create",
}

export type TokenSelectionScreenAction =
  keyof typeof TokenSelectionScreenActions;

export type TokenSelectionParams = {
  title: string;
  tokenSelectionScreenAction: TokenSelectionScreenAction;
};

export type AppWallet = {
  id: string;

  seedPhrase: string;

  mnemonic: string;

  privateKey: string;

  publicKey: string;

  address: string;
};

export type CoinGeckoTokenData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
};

export type MoralisToken = {
  balance?: number;
  token_name: string;
  token_symbol: string;
  token_logo: string;
  token_decimals: string;
  contract_address: string;
  price_usd: string;
  price_24h_percent_change: string;
  price_7d_percent_change: string;
  market_cap_usd: string;
};

export type Address = `0x${string}`;

export type Transaction = {
  Blockno: number | string;
  "DateTime (UTC)": string;
  "Parent Transaction Hash": Address;
  Status: "Success" | "Fail";
  Type: string;
  From: Address;
  From_Nametag: string;
  To: Address;
  To_Nametag: string;
  Value: string;
};

export interface EthereumToken {
  tokenName: string;
  tokenSymbol: string;
  tokenLogo: string;
  tokenDecimals: string;
  nativePrice: {
    value: string;
    decimals: number;
    name: string;
    symbol: string;
    address: string;
  };
  usdPrice: number;
  usdPriceFormatted: string;
  exchangeName: string;
  exchangeAddress: string;
  tokenAddress: string;
  priceLastChangedAtBlock: string;
  blockTimestamp: string;
  possibleSpam: boolean;
  verifiedContract: boolean;
  pairAddress: string;
  pairTotalLiquidityUsd: string;
  "24hrPercentChange": string;
  securityScore: number;
  balance: number;
  usdBalance: number;
}