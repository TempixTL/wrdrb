// Example of accessing the value for DB or View:  ClothingType.Shirt.toString -> "Shirt"
// Example of getting ClothingType instance from string: ClothingType.withName("Shirt") -> Shirt
// I'm assuming DB storage of these values would be a string

object ClothingType extends Enumeration {
    val Shirt = Value("Shirt")
    val Pants = Value("Pants")
    val Shoes = Value("Shoes")
    val Hat = Value("Hat")
    val Dress = Value("Dress")
    val Skirt = Value("Skirt")
    val Shorts = Value("Shorts")

    // method to allow for checking if an enum exists without throwing default error
    def withNameOpt(s: String): Option[Value] = values.find(_.toString == s)
}