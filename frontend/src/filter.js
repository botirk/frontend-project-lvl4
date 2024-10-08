/* eslint-disable
functional/no-expression-statement,
functional/no-conditional-statement,
no-param-reassign */
import filter from 'leo-profanity';

filter.loadDictionary('ru');

export default (word) => filter.clean(word);
