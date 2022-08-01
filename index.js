//1. Import Area

// const something = require('something');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json()) ;

require('dotenv').config();


//1. Function Defination
async function letsConnect(){
    //Whenever you are using a async function then you have to use await keyword instead
    
    //Every function return something
    return await mongoose.connect('mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASS+'@oklabsmongodbserver.dgmru.mongodb.net/?retryWrites=true&w=majority')
}


//PO.then().catch().finally();
letsConnect().then((d)=>{
    console.log('Connected');
    const Friends = mongoose.model('Friends',{
        name:String
    })

    //app.post(routename,mwfn1,mwfn2,....,handlerFunction);

    app.post('/api/save_friends',(req,res)=>{
        //
        //1. req.query
        //2. req.body
        //3. req.params
        console.log(req.body.name);

        //Lets define the schema 
        //const ClassName = mongoose.model(CollectionName,SchemeDefination);
        

        //2. Create an oject from the class
        //let object = new ClassName();
        let friendObject = new Friends({name:req.body.name});
        friendObject.save().then(d=>{
            //Success
            res.status(201).json({
                msg:"ok"
            });
        }).catch(e=>{
            //error
            res.status(400).json({
                msg:e.array()
            });
        }).finally();


        
    });

}).catch((e)=>{
    console.log('Error');
}).finally((a)=>{});




//Connect with MongoDB

//let object = new ClassName();PascalCase
//object.method();

let port = process.env.PORT || 5000 ;
app.listen(port,()=>{
    console.log('listening on port '+port)
});