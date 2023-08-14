const express = require("express") // dùng thư viện express
const app = express()

class GamesControllers {
    getHero = (req, res, next) => {
        let hero = [
            "Valhein", "Lindis", "Elsu", "Yorn", "Tel'annas", "Wisp", "Fennik", "Celica", "Slimz", "Moren", "Joker",
            "Laville", "Teeri", "Violet", "Capheny", "Hayate", "Lend'orr", "Thorne", "Archer",
            "Veres", "Yan", "Flo", "Zuka", "Super", "Taara", "Volkath", "TV", "Yena", "Butterfly", "Richter", "Ryoma",
            "Maloch", "Skud", "Tachi", "Zephys", "Allain", "Errol", "Amily", "Arduin", "Lữ Bố", "Airi", "SV Biển",
            "Astrid", "Wiro", "Omen", "Rouker", "Arthur", "Wonder", "Roxie", "Qi", "Dextra", "Max", "Fighter",
            "Aoi", "Nakroth", "Yan", "Batman", "Paine", "Zuka", "Sinestria", "Kriknak", "Raz", "Zill", "Zata",
            "Volkath", "Quillen", "Bright", "Enzo", "Ngộ khỉ", "The Flash", "Liliana", "Keera", "Assassins",
            "Veera", "Krixi", "Dirak", "Raz", "Lorion", "Iggy", "Mganga", "Natalya", "Điêu boat", "Kahli",
            "Preyta", "Marja", "Illumia", "Alester", "Tulen", "Azzen-ka", "Ignis", "Darcy", "Isha", "Yue", "Magician",
            "Shepera", "Aya", "Rouie", "Zip", "Alice", "Helen", "Gildu", "Annette", "Helen", "Krisix", "Teeme", "Support",
            "Toro", "Grakk", "Maloch", "Skud", "Lumbur", "Mina", "Arum", "Omega", "Xeniel", "Thane", "Cresh", "Ormar",
            "Chaugnar", "Y'Bneth", "Baldum", "Ata", "Tanker", "Bjan"
        ]
        hero = hero.map((hero, index) => hero = {
            id: index + 1,
            name: hero,
        })
        res.json(hero)
    }


}
module.exports = new GamesControllers;