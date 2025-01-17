import ClothingType from './ClothingType';
import Color from './Color';
import Weather from './Weather';

/**
 * A data model which stores all the information about a single Article. For
 * example, the type of clothing (shorts, shirt, pants), or color.
 */
export default class Article {
  /**
   * Creates a single Article.
   * @param {string} id The internal ID of the Article.
   * @param {ClothingType} clothingType The type of clothing this Article falls into.
   * @param {?Color} color The main color of the Article.
   * @param {?string} brand The brand of clothing of the Article.
   * @param {?Weather} weather The weather that the Article is best worn in.
   * @param {?string} material The material that the Article is made out of.
   * @param {?string} image The url of the image to upload.
   */
  constructor(id, clothingType, color = null, brand = null, weather = null, material = null, image = null) {
    this.id = id;
    this.clothingType = clothingType;
    this.color = color;
    this.brand = brand;
    this.weather = weather;
    this.material = material;
    this.image = image;
  }
}
