import Article from './Article';

/**
 * A data model which stores all the information about an Outfit. This includes
 * the Articles used, Date the Outfit was logged, and an image of the outfit.
 */
export default class Outfit {
  /**
   * Creates an Outfit.
   * @param id The internal ID of the Outfit.
   * @param {Date} date The date that the Outfit was logged.
   * @param {string?} img The URL of an image of the outfit.
   * @param {?Article[]} articles The Articles used in this outfit. Can be
   * `null` to defer loading.
   */
  constructor(id, date, img, articles) {
    this.id = id;
    this.date = date;
    this.img = img;
    this.articles = articles;
  }
}
