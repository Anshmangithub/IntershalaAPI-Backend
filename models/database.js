const mongoose = require("mongoose");

exports.connectedDatabase = async ( )=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL ,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } )
        console.log(`Database connected is Established`)
    } catch (error) {
   console.log(error.message)        
    }
}
