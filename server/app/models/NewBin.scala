package models

import play.api.libs.json.Json

case class NewBin(name: String)

object NewBin {
  object Implicits {
    implicit val reads = Json.reads[NewBin]
  }
}