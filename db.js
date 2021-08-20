const mongoose = require('mongoose')
mongoose.Promise= global.Promise


mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.cmsc6.mongodb.net/rbac?retryWrites=true&w=majority" ,
    
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log('connected to database')
}).catch(err=>{
    console.log("not connected to database \n",err)
});

mongoose.set('useFindAndModify',false)
mongoose.set('useCreateIndex',true)