// Url base para os posts
const url = "https://jsonplaceholder.typicode.com/posts";

const carregaElementos = document.querySelector("#load_Content");
const postsContainer = document.querySelector("#Container");

// pega todos os posts com função assincrona
async function pegaTodosPosts() {

    const resposta = await fetch(url);
    console.log(resposta);
    
}

pegaTodosPosts();