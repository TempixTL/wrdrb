package models

import play.api.libs.json.Json

case class NewBin(name: String)

object NewBin {
  object Implicits {
    implicit val newBinReads = Json.reads[NewBin]
  }
}
