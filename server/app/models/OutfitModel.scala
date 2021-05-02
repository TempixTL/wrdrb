package models
import scala.concurrent.Future

case class Outfit (date: String, articles: Array[String])
object OutfitModel{
  def getOutfits(username:String):Future[List[Outfit]] = {
    Future.successful(List[Outfit](
      Outfit("04/28/2021", Array("red shirt", "black pants")),
      Outfit("04/29/2021", Array("blue shirt", "green pants")),
      Outfit("04/30/2021", Array("orange shirt", "purple pants")),
    ))
  }
  //def addOutfits:Future = TODO
  //sort by date
}