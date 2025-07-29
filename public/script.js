

async function addTodo(category){

const token=localStorage.getItem('token');
    if (!token) {
        alert("No token found. Please login again.");
        return;}
        console.log(token);

const title = document.querySelector('.todoInput').value;
const response = await axios.post("http://localhost:3005/todo",{
    title:title,
    category:category },{
        headers:{
               token:token }
            })

const data=response.data;

if(data){
    document.querySelector('.todo-view').textContent=data.message;
}
await render(category);
}




async function render(category){
const token=localStorage.getItem('token');
    if (!token) {
        alert("No token found. Please login again.");
        return;}

const res= await axios.post("http://localhost:3005/todos",{

category:category},{
headers:{token:token}
})
let html="";
const todoData =res.data.todos; 

todoData.forEach(todo=>{
html= html+`<p>${todo.title}
<button onclick='deleteTodo("${todo.todoNum}","${todo.category}")'>delete</button> </p>`})
document.querySelector('.todos-list').innerHTML=html;
}




async function deleteTodo(todoNum,category){
const token=localStorage.getItem('token');
    if (!token) {
        alert("No token found. Please login again.");
        return;}
    const response = await axios.delete("http://localhost:3005/deleteTodo",{
    data:{todoNum:Number(todoNum)},
    headers:{token:token}
})
    const data=response.data;
    alert(data.message);
   await render(category);

 }