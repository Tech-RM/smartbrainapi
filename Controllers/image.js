const handleImageCalls=(req,res,db)=>{
    const {id}=req.body;

    db('users')
    .where('user_id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(response=>res.json(response));
}
module.exports={handleImageCalls};