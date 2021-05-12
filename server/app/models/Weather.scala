object Weather extends Enumeration {
    val Snow = Value("Snow")
    val Sun = Value("Sun")
    val Rain = Value("Rain")
    val Wind = Value("Wind")

    // method to allow for checking if an enum exists without throwing default error
    def withNameOpt(s: String): Option[Value] = values.find(_.toString == s)
}