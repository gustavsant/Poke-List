const searchBox = document.querySelector('#pokeSearch')
const searchButton = document.querySelector('.search-button')

searchBox.addEventListener('keypress', SetPoke)
searchButton.addEventListener('click', () => {
    console.log('clicou '+searchBox.value)
    if(searchBox.value > 1){
        GetPokeBySearch(searchBox.value)
    }
    return
})


let pokes = []
async function LoadPokemons(from, to, region){
    let filter = document.querySelector('.filter')
    filter.innerHTML = region
    let pokess = []
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${to+1}&offset=${from}`)
    const data = await response.json()
    pokess.push(data)

    BuildGrid(from, pokess)
    console.log(pokess)
    pokes = pokess
}

function BuildGrid(id, pokes){
    const grid = document.querySelector('.pokeList')
    grid.innerHTML = ''
    for(let i = 0 ; i != pokes[0].results.length ; i++){
        let mainCard = document.createElement('li')
        mainCard.classList.add('pokeMiniCard')
        id = id + 1


        grid.appendChild(mainCard)


        let pokeNameIdSpan = document.createElement('span')
        pokeNameIdSpan.classList.add('name-id')
        mainCard.appendChild(pokeNameIdSpan)


        let poke_name = document.createElement('span')
        poke_name.classList.add('name')
        pokeNameIdSpan.appendChild(poke_name)


        let poke_id = document.createElement('span')
        poke_id.classList.add('id')
        pokeNameIdSpan.appendChild(poke_id)



        let pokeImgSpan = document.createElement('span')
        pokeImgSpan.classList.add('poke-img')
        mainCard.appendChild(pokeImgSpan)


        let pokeImg = document.createElement('img')
        pokeImg.classList.add('img')
        pokeImgSpan.appendChild(pokeImg)

        poke_name.innerHTML = `${pokes[0].results[i].name}`
        poke_id.innerHTML = `#${id}`
        pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    }
}

function SetPoke(evt){

    if(evt.keyCode == 13){
        console.log('apertou enter ' + searchBox.value);
        GetPokeBySearch(searchBox.value)
    }
}
function BuildMainCard(pokeTarget){
    let pokeCardName = document.querySelector('.poke-card-name')
    pokeCardName.innerHTML = pokeTarget.name

    let pokeCardId = document.querySelector('.poke-card-id')
    pokeCardId.innerHTML = `#${pokeTarget.id}`

    let pokeCardImg = document.querySelector('.poke-card-img')
    pokeCardImg.src = pokeTarget.sprites.other.home.front_default
}
function FilterByType(type){
    let pokePerType = []
    for(let i=1 ; i!=pokes.length ; i++){
        if(pokes[i].types[0].type.name == type){
            pokePerType.push(pokes[i])
        }else if(pokes[i].types.length > 1){
            if(pokes[i].types[1].type.name == type){
                pokePerType.push(pokes[i])
            }
        }
    }
    console.log(pokePerType)
    BuildCards(pokePerType)
}
function GetPokeBySearch(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(poke => {
        return poke.json()
    }).then(BuildSearchedCard)
}
function BuildSearchedCard(poke){
    document.querySelector('.pokeList').innerHTML = ''
    console.log(poke)
    const grid = document.querySelector('.pokeList')

    let mainCard = document.createElement('li')
    grid.appendChild(mainCard)

    let pokeNameIdSpan = document.createElement('span')
    pokeNameIdSpan.classList.add('name-id')
    mainCard.appendChild(pokeNameIdSpan)

    let poke_name = document.createElement('span')
    poke_name.classList.add('name')
    pokeNameIdSpan.appendChild(poke_name)

    let poke_id = document.createElement('span')
    poke_id.classList.add('id')
    pokeNameIdSpan.appendChild(poke_id)


    let pokeImgSpan = document.createElement('span')
    pokeImgSpan.classList.add('poke-img')
    mainCard.appendChild(pokeImgSpan)

    let pokeImg = document.createElement('img')
    pokeImg.classList.add('img')
    pokeImgSpan.appendChild(pokeImg)


    poke_name.innerHTML = poke.species.name
    poke_id.innerHTML = `#${poke.id}`
    pokeImg.src = poke.sprites.other.home.front_default
}


