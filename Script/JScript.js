// Url base para os posts
const url = "https://jsonplaceholder.typicode.com/posts";

const carregaElementos = document.querySelector("#load-content");
const postsContainer = document.querySelector("#container-posts");

// elementos para serem preenchidos no post
const paginaPost = document.querySelector("#post");
const containerPost = document.querySelector("#container-post");
const comentarioContainer = document.querySelector("#container-comentario");

const commentForm = document.querySelector("#formComentario");
const emailInput = document.querySelector("#email");
const bodyInput = document.querySelector("#body");

// pegar o id da URL
// URLSearchParams(window.location.search) este objeto devolve um metodo que entrega os parametros da URL
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id");
// console.log(postId)

// pega todos os posts com função assincrona
async function pegaTodosPosts() {

    // Obtendo propriedades do JSON
    const resposta = await fetch(url);
    // console.log(resposta);

    // Obtendo dados do JSON
    const dados = await resposta.json();
    // console.log(dados);

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
        // console.log(title);
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

// função que faz o post individual
async function pegaPost(id) {

    const [responsePost, responseComments] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`),
    ]);

    const dadosPost = await responsePost.json();
    const dadosComentario = await responseComments.json();

     carregaElementos.classList.add("hide");
    paginaPost.classList.remove("hide");

    const title = document.createElement("h1");
    const body = document.createElement("p");

    title.innerText = dadosPost.title;
    body.innerText = dadosPost.body;

    containerPost.appendChild(title);
    containerPost.appendChild(body);

    dadosComentario.map((comment) => {
        createComment(comment);
    });

}

function createComment(comment) {
    const div = document.createElement("div");
    const email = document.createElement("h3");
    const commentBody = document.createElement("p");

    email.innerText = comment.email;
    commentBody.innerText = comment.body;

    div.appendChild(email);
    div.appendChild(commentBody);

    comentarioContainer.appendChild(div);
}

// comentario do post
async function postComment(comment) {
    
    const response = await fetch(`${url}/${postId}/comments`, {
        method: "POST",
        body: comment,
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data = await response.json();
    // console.log(data);
    createComment(data);
}

// pegaTodosPosts();
// Se postId for nulo
if (!postId) {
    pegaTodosPosts();
} else {
    // fazPost(postId);
    pegaPost(postId);

    //adicionando evento
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let comment = {
            email: emailInput.value,
            body: bodyInput.value,
        };

        // console.log(comment);
        comment = JSON.stringify(comment);

        postComment(comment);
    });
}
