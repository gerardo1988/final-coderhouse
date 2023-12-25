
function llamarApi(){
    console.log("Llamando api users.");
    const userId = localStorage.getItem('USER_ID');
    fetch('/api/jwt/currentUser',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    }).then(result=>{
        if(result.status===200){
            result.json()
            .then(json=>{
                console.log(json);
                const htmlScript = document.getElementById('userTemplate').innerHTML;
                let theTemplate = Handlebars.compile(htmlScript);
                const compiledTemplate = theTemplate(json.payload);
                console.log(compiledTemplate);
                document.getElementById('userInfo').innerHTML = compiledTemplate;
            });
        } else if (result.status === 401){
            console.log(result);
            alert("Credenciales invalidas, debes loguearte de nuevo.");
            //window.location.replace('/users/login');
        } else if (result.status === 403){
            console.log(result);
            alert("Usuario no autorizado, revisa tus accesos.");
            //window.location.replace('/users/login');
        }
    })
};
llamarApi();

//para cerrar sesion
const buttonLogout = document.getElementById('cerrar_sesion');

buttonLogout.addEventListener('click',()=>{
    fetch('/api/users/logoutuser',{
        method:'GET'
    }).then(result=>{
        if(result.status===200){
                         
            alert("usted esta por cerrar sesion y sera redirigido");
            window.location.replace('/loginuser');

        } else {
            console.log(result);
            alert("error al cerrar sesion");
        }
    }).catch(error=>{
        console.log(error);
    })
})