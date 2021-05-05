object Color extends Enumeration {
    val Red = Value("Red")
    val Orange = Value("Orange")
    val Yellow = Value("Yellow")
    val Green = Value("Green")
    val Blue = Value("Blue")
    val Indigo = Value("Indigo")
    val Violet = Value("Violet")
    val Black = Value("Black")
    val White = Value("White")
    val Grey = Value("Grey")
    val Brown = Value("Brown")

    // method to allow for checking if an enum exists without throwing default error
    def withNameOpt(s: String): Option[Value] = values.find(_.toString == s)
}