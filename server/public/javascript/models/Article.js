import ClothingType from './ClothingType.js';
import Color from './Color.js';
import Weather from './Weather.js';

/**
 * A data model which stores all the information about a single Article. For
 * example, the type of clothing (shorts, shirt, pants), or color.
 */
export default class Article {
  /**
   * Creates a single Article.
   * @param {ClothingType} clothingType The type of clothing this Article falls into.
   * @param {?Color} color The main color of the Article.
   * @param {?string} brand The brand of clothing of the Article.
   * @param {?Weather} weather The weather that the Article is best worn in.
   * @param {?string} material The material that the Article is made out of.
   * @param {?string} image The url of the image to upload.
   */
  constructor(clothingType, color, brand, weather, material, image) {
    this.clothingType = clothingType;
    this.color = color;
    this.brand = brand;
    this.weather = weather;
    this.material = material;
    this.image = image;
  }
}