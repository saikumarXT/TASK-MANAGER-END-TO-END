

async function addTodo(category){

const token=localStorage.getItem('token');
    if (!token) {
        alert("No token found. Please login again.");
        return;}
        console.log(token);

const title = document.querySelector('.todoInput').value;
const response = await axios.post("http://localhost:3006/todo",{
    title:title,
    category:category },{
        headers:{
               token:token }
            })

const data=response.data;

if(data){
    console.log(data.message)}


await render(category);
}




async function render(category){
const token=localStorage.getItem('token');
    if (!token) {
        alert("No token found. Please login again.");
        return;}

const res= await axios.post("http://localhost:3006/todos",{

category:category},{
headers:{token:token}
})
let html="";
const todoData =await res.data.todo; 
 console.log(todoData);
todoData.forEach(todo=>{
html= html+`<div class='todo-div'><p>${todo.title}</p>
<button onclick='deleteTodo("${todo._id}","${todo.category}")'class='delete-button'>DELETE</button>
</div>`
})
document.querySelector('.todos-list').innerHTML=html;
}




async function deleteTodo(id,category){
const token=localStorage.getItem('token');
    if (!token) {
        alert("No token found. Please login again.");
        return;}
    const response = await axios.post('http://localhost:3006/deleteTodo',{
        todoNum:id},
       {headers:{token:token}
})
    const data=response.data;
   await render(category);

 }