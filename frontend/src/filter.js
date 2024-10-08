import filter from "leo-profanity";

filter.loadDictionary("ru");

export default (word) => filter.clean(word);
