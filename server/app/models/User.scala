package models

import play.api.libs.json.Json

case class User(id: Int, username: String)

object User {
  object Implicits {
    implicit val writes = Json.writes[User]
  }
}
