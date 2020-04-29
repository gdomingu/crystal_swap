# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.find_or_create_by(name: "moonchild", email: "moonchild@example.com")
Gift.create(
  [
    { gifter: user, name: "Obsidian", description: "Obsidian is a naturally occurring volcanic glass formed as an extrusive igneous rock."},
    { gifter: user, name: "Tiger Eye", description: "a chatoyant gemstone that is usually a metamorphic rock with a golden to red-brown colour and a silky lustre."},
    { gifter: user, name: "Selenite", description: "Good for clearing energy."},
    { gifter: user, name: "Pyrite", description: "Will make you feel happy"},
    { gifter: user, name: "Agate", description: "Beautiful and will bring you victory."},
  ]
)