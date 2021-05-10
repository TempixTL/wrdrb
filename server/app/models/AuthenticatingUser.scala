package models

import play.api.libs.json.Json

case class AuthenticatingUser(username: String, password: String)

object AuthenticatingUser {
  object Implicits {
    implicit val reads = Json.reads[AuthenticatingUser]
  }
}

