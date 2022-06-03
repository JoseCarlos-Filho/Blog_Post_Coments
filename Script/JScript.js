// Url base para os posts
const url = "https://jsonplaceholder.typicode.com/posts";

const carregaElementos = document.querySelector("#load_Content");
const postsContainer = document.querySelector("#container");

// pega todos os posts com função assincrona
async function pegaTodosPosts() {

    // Obtendo propriedades do JSON
    const resposta = await fetch(url);
    console.log(resposta);

    // Obtendo dados do JSON
    const dados = await resposta.json();
    console.log(dados);

    // escondendo o carregaElementos utilizando o classList com a ação add com a classe esconder "hide"
    carregaElementos.classList.add("hide");

    // passar por cada elemento da requisição para inserir cada post
    // criando os elementos da page para inserção do Post
    // As propriedades criadas são propriedades do JSON referente a API.
    // arrow function
    dados.map((post) => {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const body = document.createElement("p");
        const link = document.createElement("a");

        title.innerText = post.title;
        console.log(title);
        body.innerText = post.body;
        link.innerText = "Ler";
        // id do post para posteriormente ser extraido.
        link.setAttribute("href", `/post.html?id=${post.id}`);

        // adicionando os conteudo em sequência com appendChild
        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(link);

        // montando o post no elemento div, carregando todos os posts da API
        postsContainer.appendChild(div);

    });
}

pegaTodosPosts();