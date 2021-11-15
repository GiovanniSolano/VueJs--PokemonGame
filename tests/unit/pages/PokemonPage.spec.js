import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";



describe('PokemonPage component', () => {
    
    let wrapper;

    beforeEach(() => {

        wrapper = shallowMount(PokemonPage)

    })

    test('debe de hacer match con el snapshot ', () => {
      
        expect(wrapper.html()).toMatchSnapshot()
        
    })

    test('debe de llamar mixPokemonArray al montar', () => {
        
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        const wrapper = shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()

    })
    
    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''            
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot()


    })


    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => {
        
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''            
                }
            }
        })
        const pokemonOptions = wrapper.find('pokemon-options-stub');
        const PokemonPicture = wrapper.find('pokemon-picture-stub');
        expect(pokemonOptions.exists()).toBeTruthy()
        expect(PokemonPicture.exists()).toBeTruthy()
        expect(pokemonOptions.attributes('pokemons')).toBeTruthy()
        expect(PokemonPicture.attributes('pokemonid')).toBe("1")

    })
    
    test('prueba con checkAnswer', async() => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''            
                }
            }
        })

        await wrapper.vm.checkAnswer(1);

        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`);

        await wrapper.vm.checkAnswer(5);

        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`);



    })
    
    

})
