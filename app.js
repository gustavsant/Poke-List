const searchBox = document.querySelector('#pokeSearch')
const searchButton = document.querySelector('.search-button')

const type_bgcolor = {
    steel: '#D6D2C4',
    water: '#B2C8DF',
    dragon: '#898AA6',
    electric: '#FFF89A',
    fairy: '#FFB2A6',
    ghost: '#6867AC',
    fire: '#FF3D33',
    ice: '#B4F2E1',
    bug: '#CFF6CF',
    fighting: '#E08F62',
    normal: '#CFC5A5',
    rock: '#CDB699',
    grass: '#C4DFAA',
    psychic: '#D885A3',
    dark: '#78869b',
    ground: '#C0A080',
    poison: '#b9aac0',
    flying: '#CDF0EA',

}

searchBox.addEventListener('keypress', SetPoke)
searchButton.addEventListener('click', () => {
    console.log('clicou '+searchBox.value)
    GetPokeBySearch(searchBox.value)
})

let filter = document.querySelector('.filter')
let region
let pokes = []
async function LoadPokemons(from, to, regiontofilter){

    filter.innerHTML = regiontofilter
    region = regiontofilter

    let pokess = []
    for(let i = from ; i != to ; i++){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const data = await response.json()
        pokess.push(data)
    }

    BuildGrid(pokess)
    console.log(pokess)
    pokes = pokess
}

function BuildGrid(pokes){
    const grid = document.querySelector('.pokeList')
    grid.innerHTML = ''
    for(let i = 0 ; i != pokes.length ; i++){
        let mainCard = document.createElement('li')
        mainCard.classList.add('pokeMiniCard')
        mainCard.setAttribute('data-id', pokes[i].id)
        mainCard.addEventListener('click', TargetClicked)


        grid.appendChild(mainCard)


        let pokeNameIdSpan = document.createElement('span')
        pokeNameIdSpan.classList.add('name-id')
        mainCard.appendChild(pokeNameIdSpan)
        pokeNameIdSpan.setAttribute('data-id', pokes[i].id)


        let poke_name = document.createElement('span')
        poke_name.classList.add('name')
        pokeNameIdSpan.appendChild(poke_name)
        poke_name.setAttribute('data-id', pokes[i].id)


        let poke_id = document.createElement('span')
        poke_id.classList.add('id')
        pokeNameIdSpan.appendChild(poke_id)
        poke_id.setAttribute('data-id', pokes[i].id)



        let pokeImgSpan = document.createElement('span')
        pokeImgSpan.classList.add('poke-img')
        mainCard.appendChild(pokeImgSpan)
        pokeImgSpan.setAttribute('data-id', pokes[i].id)


        let pokeImg = document.createElement('img')
        pokeImg.classList.add('img')
        pokeImgSpan.appendChild(pokeImg)
        pokeImg.setAttribute('data-id', pokes[i].id)


        poke_name.innerHTML = CapitalChar(`${pokes[i].name}`)
        poke_id.innerHTML = `#${pokes[i].id}`
        pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokes[i].id}.png`
    }
}

function SetPoke(evt){

    if(evt.keyCode == 13){
        console.log('apertou enter ' + searchBox.value);
        GetPokeBySearch(searchBox.value)
    }
}
async function TargetClicked(pokeTarget){
    let targetId = pokeTarget.target.dataset.id
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${targetId}`)
    const data = await response.json()
    BuildMainCard(data)
}

function BuildMainCard(target){
    //atualiza os dados do cartão principal
    const pokeCardName = document.querySelector('.poke-card-name')
    pokeCardName.innerHTML = CapitalChar(target.name)

    const pokeCardId = document.querySelector('.poke-card-id')
    pokeCardId.innerHTML = `#${target.id}`

    const pokeCardImg = document.querySelector('.poke-card-img')
    pokeCardImg.src = target.sprites.other["official-artwork"].front_default

    const pokeCardTypes = document.querySelector('.poke-card-type')
    if(target.types.length >= 2){
        pokeCardTypes.innerHTML = `${CapitalChar(target.types[0].type.name)} / ${CapitalChar(target.types[1].type.name)}`
    } else{
        pokeCardTypes.innerHTML = CapitalChar(target.types[0].type.name)
    }


    //Atualiza os status do cartão principal
    const pokeCardHp = document.querySelector('.poke-stat-hp')
    pokeCardHp.innerHTML = 'HP: '+target.stats[0].base_stat

    const pokeCardAtk = document.querySelector('.poke-stat-ataque')
    pokeCardAtk.innerHTML = 'Ataque: '+target.stats[1].base_stat

    const pokeCardDef = document.querySelector('.poke-stat-defesa')
    pokeCardDef.innerHTML = 'Defesa: '+target.stats[2].base_stat

    const pokeCardAtkSp = document.querySelector('.poke-stat-ataque-sp')
    pokeCardAtkSp.innerHTML = 'Ataque.Sp: '+target.stats[3].base_stat

    const pokeCardDefSp = document.querySelector('.poke-stat-defesa-sp')
    pokeCardDefSp.innerHTML = 'Defesa.Sp: '+target.stats[4].base_stat

    const pokeCardVel = document.querySelector('.poke-stat-velocidade')
    pokeCardVel.innerHTML = 'Velocidade: '+target.stats[5].base_stat

    //atualiza as habilidades do cartão
    const pokeCardSkill1 = document.querySelector('.poke-stat-skill1')
    const pokeCardSkill2 = document.querySelector('.poke-stat-skill2')

    if(target.abilities.length==2){
        pokeCardSkill1.innerHTML = CapitalChar(target.abilities[0].ability.name)
        pokeCardSkill2.innerHTML = CapitalChar(target.abilities[1].ability.name)
    } else{
        pokeCardSkill1.innerHTML = CapitalChar(target.abilities[0].ability.name)
        pokeCardSkill2.innerHTML = ''
    }



    //atualiza o estilo do cartão
    const cardTop = document.querySelector('.card-top')
    cardTop.style.backgroundColor = type_bgcolor[target.types[0].type.name]
    console.log(type_bgcolor[target.types[0].type.name])

    cardTop.style.backgroundImage = `url(images/icons/Pokemon_Type_Icon_${CapitalChar(target.types[0].type.name)}.svg)` //images\icons\Pokemon_Type_Icon_Bug.svg

    // background-color: #98e56c;
    // background-image: url('../images/pokeballgrayscale.png');

}

function FilterByType(type){
    pokesByType = []
    for(let i = 0 ; i != pokes.length ; i++){
        if(pokes[i].types.length > 1){
            if(pokes[i].types[0].type.name == type){
                pokesByType.push(pokes[i])
                console.log('filtrado')
            } else if(pokes[i].types[1].type.name == type){
                pokesByType.push(pokes[i])
                console.log('filtrado');
            }  
        }else{
            if(pokes[i].types[0].type.name == type){
                pokesByType.push(pokes[i])
                console.log('filtrado')
            }
        }
        
    }
    BuildGrid(pokesByType)
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
    mainCard.setAttribute('data-id', poke.id)
    mainCard.addEventListener('click', TargetClicked)
    grid.appendChild(mainCard)

    let pokeNameIdSpan = document.createElement('span')
    pokeNameIdSpan.classList.add('name-id')
    mainCard.appendChild(pokeNameIdSpan)
    pokeNameIdSpan.setAttribute('data-id', poke.id)

    let poke_name = document.createElement('span')
    poke_name.classList.add('name')
    pokeNameIdSpan.appendChild(poke_name)
    poke_name.setAttribute('data-id', poke.id)

    let poke_id = document.createElement('span')
    poke_id.classList.add('id')
    pokeNameIdSpan.appendChild(poke_id)
    poke_id.setAttribute('data-id', poke.id)


    let pokeImgSpan = document.createElement('span')
    pokeImgSpan.classList.add('poke-img')
    mainCard.appendChild(pokeImgSpan)
    pokeImgSpan.setAttribute('data-id', poke.id)

    let pokeImg = document.createElement('img')
    pokeImg.classList.add('img')
    pokeImgSpan.appendChild(pokeImg)
    pokeImg.setAttribute('data-id', poke.id)


    poke_name.innerHTML = CapitalChar(poke.species.name)
    poke_id.innerHTML = `#${poke.id}`
    pokeImg.src = poke.sprites.other["official-artwork"].front_default
}
function CapitalChar(str){
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2
}


