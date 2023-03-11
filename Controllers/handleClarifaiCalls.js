const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");


const handleClarifaiCalls=(url,res)=>{

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key process.env.clarifaiKey");

stub.PostModelOutputs(
    {
        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
        model_id: "face-detection",
        inputs: [{data: {image: {url: url}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            return;
        }

        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }else{
            
            let data=response.outputs[0].data.regions[0].region_info.bounding_box;
            return res.json(data);
    
        }
    }
)
}

module.exports={handleClarifaiCalls};