export interface ResponseModel {
  time: TimeStampDetails;
  bpi: Record<string, CurrencyDetails>;
}

export interface CurrencyDetails {
  code: string;
  symbol: string;
  rate: string;
  rate_float: number;
  description: string;
}

export interface CalculatedCurrencies
  extends Pick<CurrencyDetails, 'code' | 'symbol'> {
  code: string;
  symbol: string;
  calculatedRate: number;
}

export interface TimeStampDetails {
  updated: string;
  updatedISO: string;
  updateduk: string;
}
