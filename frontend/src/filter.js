/* eslint-disable
no-param-reassign */
import filter from 'leo-profanity';

filter.add(filter.getDictionary('ru'));

export default (word) => filter.clean(word);
