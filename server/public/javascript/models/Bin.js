import Article from './Article.js';

/**
 * A data model which stores all the data about a Bin, including all of it's
 * contained Articles.
 */
export default class Bin {
  /**
   * Creates a Bin with a given `name` and list of `articles`.
   * @param {string} id The internal ID of the Bin.
   * @param {string} name The name of the Bin.
   * @param {string} username The username of the Bin's owner
   * @param {?Article[]} articles The articles within the Bin. Can be `null`
   * to defer loading.
   */
  constructor(id, name, username, articles = null) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.articles = articles;
  }
}
