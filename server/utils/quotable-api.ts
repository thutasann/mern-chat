import axios from 'axios';
import { RandomQuotesProps } from '../types/canvas';
import { quotableAPI } from './constants';

export const getQuoteData = async () => {
	const res = await axios.get<RandomQuotesProps>(quotableAPI);
	return res.data.content.split(' ');
};
