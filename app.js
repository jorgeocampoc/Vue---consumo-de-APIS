const { createApp, ref, onMounted } = Vue
createApp({
  setup() {
    const characters = ref([]);
    const info = ref({});
    const searchInput = ref('');
    const page = ref(1);
    const tipo = ref('character')
    const timeout = ref(5000)
    const character = ref({});
    const isLoading =ref(false);
    const baseUrl = `https://rickandmortyapi.com/api`;
    
    const prevBtn = async ()=>{
      isLoading.value = true;
        try{
            const {data} = await axios.get(info.value.prev);
            characters.value = [];
            characters.value = [...data.results];
            info.value = data.info;
            page.value-=1;
            timeout.value = 500;
            finishLoading()
        }catch (error){
            console.log(error);
        }

    }
    function finishLoading(){
      setTimeout(() => {
        isLoading.value = false;
      }, timeout.value);
    }
    const search = async( event )=>{
      isLoading.value = true;
      try {
        const {data} = await axios.get(`${baseUrl}/${tipo.value}/?name=${searchInput.value}`);
        characters.value = [...data.results];
        info.value = data.info;
        page.value = 1;
        timeout.value = 500;
        finishLoading()
      } catch (error) {
        console.error(error);
    }
    }
    const nextBtn = async ()=>{
      isLoading.value = true;
        console.log(info.value);
        try{
            const {data} = await axios.get(info.value.next);
            console.log(data);
            characters.value = [];
            characters.value = [...data.results];
            info.value = data.info;
            page.value+=1;
            timeout.value = 500;
            finishLoading()
        }catch (error){
            console.log(error);
        }
        
    }
   
    const getCharacters = async( t='character' )=>{
      tipo.value = t;
      page.value = 1;
      console.log(tipo.value);
      isLoading.value = true;
        try {
            const {data} = await axios.get(`${baseUrl}/${tipo.value}`);
            characters.value = [...data.results];
            info.value = data.info;
            console.log(info.value);
            timeout.value = 500;
            finishLoading()
          } catch (error) {
            console.error(error);
          }
    }
    const showCharacter = (user)=>{
        character.value = {...user}
        console.log(character.value);
        finishLoading()
    }

    onMounted(()=>{
        getCharacters();
    })


    return {    
      characters,
      timeout,
      getCharacters,
      tipo,
      prevBtn,
      nextBtn,
      isLoading,
      info,
      searchInput,
      page,
      showCharacter,
      search,
      character,

    }
  }
}).mount('#app')