package models

import play.api.libs.json.Json

case class User(id: Int, username: String)

object User {
  object Implicits {
    implicit val userWrites = Json.writes[User]
  }
}
