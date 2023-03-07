const handleRegistration=(req,res,db,bcrypt)=>{
    const {name,email,password}= req.body;
    if(!name||!email||!password){
        return res.status(400).json('Getting bad request, incorrect form submission.')
    }

    const hash=bcrypt.hashSync(password,6);
    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            trx.insert({
                name:name,
                email:loginEmail[0].email,
                joined:new Date()
            })
            .into('users')
            .returning('*')
            .then(user=>{user.length?res.json(user[0]):res.status(404).json('Error geting user details')

            })

        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>console.log(err))
}
module.exports={handleRegistration};