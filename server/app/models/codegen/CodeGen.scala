package models.codegen

object CodeGen extends App {
  slick.codegen.SourceCodeGenerator.run(
    "slick.jdbc.PostgresProfile", 
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost/wrdrb?user=lizzie&password=password",
    "/home/lizzie/workspace/WebApps/wrdrb/server/app/", 
    "models.codegen", Some("lizzie"), Some("password"), true, false
  )
}
