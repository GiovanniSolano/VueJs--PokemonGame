<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>Quien es este pokemon?</h1>

    <pokemon-picture :pokemonId="pokemon.id" :showPokemon="showPokemon"></pokemon-picture>
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer"/>

    <!-- div or template -->
    <template v-if="showAnswer" class="fade-in">
      <h2>{{message}}</h2>

      <button @click="newGame">Nuevo Juego</button>
    </template>

  </div>




</template>

<script>
import PokemonOptions from '@/components/PokemonOptions.vue';

import getPokemonOptions from '@/helpers/getPokemonOptions';
import PokemonPicture from '../components/PokemonPicture.vue';



export default {
    components: {PokemonOptions, PokemonPicture},
    data() {
      return {
        pokemonArr: [],
        pokemon: null,
        showPokemon: false,
        showAnswer: false,
        message: ''
      }
    },

    methods: {
      async mixPokemonArray() {
        this.pokemonArr = await getPokemonOptions()

        const rdnInt = Math.floor(Math.random() * 4)
        this.pokemon = this.pokemonArr[rdnInt]
      },
      
      checkAnswer(selectedId) {
        
        this.showPokemon = true
        this.showAnswer = true
        
        if(selectedId === this.pokemon.id) {
          this.message = `Correcto, ${this.pokemon.name}`
        } else {
          this.message = `Oops, era ${this.pokemon.name}`
        }

      },

      newGame() {
        this.showPokemon = false
        this.showAnswer = false
        this.pokemonArr = []
        this.pokemon = null
        this.mixPokemonArray()

      }
    },

    mounted() {
      this.mixPokemonArray();
    }

}
</script>