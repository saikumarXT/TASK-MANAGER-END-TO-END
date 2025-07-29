async function signup(){
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
     const name= document.querySelector('.name').value;
      
   const response = await axios.post('http://localhost:3005/signup',{
        email:email,
        password:password,
        name:name
    })
    const data=response.data;
    document.querySelector('.login-status').textContent=data.message;
    };

async function signin (){
        const email = document.querySelector('.email').value;
        const password = document.querySelector('.password').value;
        const name= document.querySelector('.name').value;
        const response = await axios.post("http://localhost:3005/signin",{
        email:email,
        password:password,
        name:name})
        const data = response.data;

        if(response){
         localStorage.setItem('token',data.token)
         window.location.href= 'index.html';
          alert('you are signed_up successfully')
        }
}



