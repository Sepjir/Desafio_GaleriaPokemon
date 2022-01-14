// Almacenando modulos de node en constantes
const axios = require("axios")
const http = require("http")
const fs = require("fs")
const url = require("url")

let pokeData = [] 
getPokemones().then((data) => {
    data.forEach(e => {
        getPokemonImg(e.name).then((r) => {
            let pokeInfo = new Object()
            pokeInfo.nombre = e.name
            pokeInfo.img = r
            pokeData.push(pokeInfo)
            fs.writeFile("poke.json", JSON.stringify(pokeData), "utf-8", () => {
            })

        })
    })
})

//Función asincrona para obtener nombre de pokemones
async function getPokemones() {
    const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")
        return data.results
        
    }

//Función asincrona para obtener imagenes de los pokemones
async function getPokemonImg(name) {
    const datos = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${name}`)
    let img =  datos.data.sprites.front_default
    return img
}


// Creando servidor
http.createServer((req, res) => {
    

    //Disponibilizando url raíz para carga de html con spinner
    if (req.url.includes("/")) {
        res.writeHead(200, {"content-type" : "text/html"})
        fs.readFile("index.html", "utf-8", (err, data) => {
            res.end(data)
        })
    }

    // disponibilizando url "pokemones" para la lectura de JSON
    if (req.url.includes("/pokemones")) {
        res.writeHead(200, {"content-type" : "text/html"})
        fs.readFile("poke.json", "utf-8", (err, data) => {
            res.end(data)
        })
    }

    
    
})
.listen(3000, () => console.log("Servidor levantado en el puerto 3000"))