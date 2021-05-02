import Article from './Article.js';

/**
 * A data model which stores all the data about a Bin, including all of it's
 * contained Articles.
 */
export default class Bin {
  /**
   * Creates a Bin with a given `name` and list of `articles`.
   * @param {string} name The name of the Bin.
   * @param {Article[]} articles The articles within the Bin.
   */
  constructor(name, articles) {
    this.name = name;
    this.articles = articles;
  }
}