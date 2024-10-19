/* eslint-disable
no-param-reassign */
import filter from 'leo-profanity';

export const filterInit = () => filter.add(filter.getDictionary('ru'));

export default (word) => filter.clean(word);
