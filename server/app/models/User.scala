package models

object User {

    private val users = Map[String, String]("wrdrb" -> "wrdrb")
    private val articles = Map[String, Seq[String]]("wrdrb" -> Seq("Black Shirt", "Blue Jeans"))

    // Validation / Registration
    def validateLogin(username: String, password: String) = ???

    def createUser(username: String, password: String, firstName: String, lastName: String) = ???


    // Get User's Data
    def getArticles(username: String) = ???

    def getBins(username: String) = ???

    def getOutfitLog(username: String) = ???


    // Create / Update / Delete Bins
    def createBin(username: String) = ???

    def deleteBin(username: String) = ???

    def addArticleFromBin(username: String) = ???

    def removeArticleFromBin(username: String) = ???

}