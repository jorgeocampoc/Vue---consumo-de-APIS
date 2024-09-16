const { createApp, ref, onMounted } = Vue
createApp({
  setup() {
    const characters = ref([]);
    const info = ref({});
    const page = ref(1)
    const character = ref({})
    
    const prevBtn = async ()=>{
        try{
            const {data} = await axios.get(info.value.prev);
            characters.value = [];
            characters.value = [...data.results];
            info.value = data.info;
            page.value-=1;
        }catch (error){
            console.log(error);
        }

    }
    const nextBtn = async ()=>{
        console.log(info.value);
        try{
            const {data} = await axios.get(info.value.next);
            console.log(data);
            characters.value = [];
            characters.value = [...data.results];
            info.value = data.info;
            page.value+=1;
        }catch (error){
            console.log(error);
        }
        
    }
    const getCharacters = async()=>{
        try {
            const {data} = await axios.get('https://rickandmortyapi.com/api/character');
            characters.value = [...data.results];
            info.value = data.info;
            console.log(info.value);
          } catch (error) {
            console.error(error);
          }
    }
    const showCharacter = (user)=>{
        character.value = {...user}
        console.log(character.value);
    }

    onMounted(()=>{
        getCharacters();
    })


    return {    
      characters,
      getCharacters,
      prevBtn,
      nextBtn,
      info,
      page,
      showCharacter,
      character,

    }
  }
}).mount('#app')