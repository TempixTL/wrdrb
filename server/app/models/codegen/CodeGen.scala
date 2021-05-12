package models.codegen

object CodeGen extends App {
  slick.codegen.SourceCodeGenerator.run(
    "slick.jdbc.PostgresProfile", 
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost/wrdrb?user=wrdrb",
    "/Users/tom/Code/class/WebApps/wrdrb/server/app/", 
    "models.codegen", None, None, true, false
  )
}
