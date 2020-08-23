import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])

  const fetchPokemon = async () => {
    const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
    console.log('loading')
    const pokemonPromises = []

    setLoading(true)
    for (let i = 1; i <= 150; i++) {
      pokemonPromises.push(
        fetch(getPokemonUrl(i)).then((response) => response.json())
      )
    }

    try {
      console.time('promise time')
      const pokemons = await Promise.all(pokemonPromises)
      console.timeEnd('promise time')
      setPokemons(pokemons)

      console.time('promise time')
      const pokemonsRace = await Promise.race(pokemonPromises)
      console.timeEnd('promise time')

      setLoading(false)
    } catch (err) {
      alert(err)
      setLoading(false)
    }
    // async function getPokemons(){
    //   const promises = await pokemonPromises.map(async((url,idx) =>
    //     console.log(`Received Todo ${idx+1}:`, await fetch(url))
    //     )
    //     await Promise.all(promises);
    //     console.log('Finished');
    //   )
    // }

    // for (const [idx, url] of pokemonPromises.entries()) {
    //   const todo = await fetch(url)
    //   console.log(`Received Todo ${idx + 1}:`, todo)
    // }

    console.log('Finished!')
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    fetchPokemon()
  }, [])

  return (
    <div className='App'>
      {loading && (
        <p
          style={{ margin: '0 auto', backgroundColor: 'blue', height: '100vh' }}
        >
          Carregando
        </p>
      )}
      {pokemons.length > 0 &&
        pokemons.map((pokemon) => {
          const ref = React.createRef()

          const handleClick = () =>
            ref.current.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })

          return (
            <li
              key={pokemon.id}
              ref={ref}
              style={{ height: '250px', border: '1px solid black' }}
            >
              <div>{pokemon.id}</div>
              <div>{pokemon.name}</div>
              <button type='button' onClick={handleClick}>
                Scroll Into View
              </button>
            </li>
          )
        })}
    </div>
  )
}

export default App
