const {handleClarifaiCalls}=require('./handleClarifaiCalls');

const handleImageCalls=(req,res,db)=>{
    const {id,url}=req.body;
    console.log(req.body);


    // db('users')
    // .where('user_id', '=', id)
    // .increment('entries', 1)
    // .returning('entries')
    // .then(response=>res.json(response));
   handleClarifaiCalls(url,res);
   
}
module.exports={handleImageCalls};