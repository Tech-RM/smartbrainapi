const handleProfileUpdate=(req,res,db)=>{
   
    db.select('name', 'email', 'entries','joined')
        .from('users')
        .where('user_id', req.params.id)
        .then(user=>{
                    if(user.length){
                        res.json(user[0]);
                    }
                    else{res.status(404).json('Unable to find user, Please try again!')}
                }
            );

}
const handleLoadUsers=(req,res,db)=>{
    db.select('*').from('users')
    .then(user=>{
        user.length?
        res.json(user):
        res.json('Error getting user list..maybe something wrong with database')});
}

module.exports={handleProfileUpdate,handleLoadUsers};