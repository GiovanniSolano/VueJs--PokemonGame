import pokemonApi from "../api/pokemonApi";

const getPokemons = () => {


    const pokemonsArr = Array.from(Array(650));

    return pokemonsArr.map((_, index) => index + 1);

}

const getPokemonOptions = async() => {

    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));

    return pokemons;
}

const getPokemonNames = async(pokemons = []) => {

    const promesas = pokemons.map((id) => {
        return pokemonApi.get(`/${id}`);
      });
     
      const responses = await Promise.all(promesas);
     
      const pokemonsNames = responses.map((rta) => {
        return {
          name: rta.data.name,
          id: rta.data.id,
        };
      });
     
      return pokemonsNames;

}

export default getPokemonOptions;