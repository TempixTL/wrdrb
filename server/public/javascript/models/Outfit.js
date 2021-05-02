import Article from './Article.js';

/**
 * A data model which stores all the information about an Outfit. This includes
 * the Articles used, Date the Outfit was logged, and an image of the outfit.
 */
export default class Outfit {
  /**
   * Creates 
   * @param {Article[]} articles The Articles used in this outfit.
   * @param {Date} date The date that the Outfit was logged.
   * @param {string?} img The URL of an image of the outfit.
   */
  constructor(articles, date, img) {
    this.articles = articles;
    this.date = date;
    this.img = img;
  }
}