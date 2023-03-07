const handleSignIn=(req,res,db,bcrypt)=>{
    console.log(req.headers['user-agent']);
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json('Incorrect form submission @ Signin');
    }
    db.select('email','hash').from('login').where('email',email)
        .then(data=>{
                if(data.length){
                    let isValid=bcrypt.compareSync(password, data[0].hash);
                    isValid?
                    db.select('*').from('users').where('email',email)
                    .then(user=>res.json(user[0]))
                    :
                    res.status(400).json('Wrong Credentials!!!')
                }else{
                    res.status(400).json('No such user found')
                }  
        })
        .catch(error=>console.log('Somthing wesnt wrong on getting data from db', error))


}
module.exports={handleSignIn};