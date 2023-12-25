
//esta funcion no tendra nada
export async function githubLogin (req, res){

}

//esta funcion hara el callback
export async function callback(req, res){
    const user = req.user;
    req.session.user= {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,

    }
    req.session.admin = false;
    res.redirect('/users');
}


