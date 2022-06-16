const mongoose=require("mongoose");

// const { default: isBoolean } = require("validator/lib/isboolean");
const feedbackSchema = new mongoose.Schema({
   
   username :{
       type: String,
       required:true
       
   },
   email :{
       type:String,
       required:true
   },
   message :{
       type: String,
       required:true
   }
    
  },{ timestamps: true });

  const Feedback =new mongoose.model("Feedback",feedbackSchema);

const fortsSchema = new mongoose.Schema({

  
  fortsName: {
    type : String,
    required:true
    
    
  },
  description: {
      type: String,
      required:true
    },
    
  //   image: {
  //     data: Buffer,
  //     contentType: String
  // },
  location:{
      type : String,
      required: true
  },
  
  image: {
    data: Buffer,
    contentType: String
},
 
  createdAt: {
      type: Date,
      default: Date.now
  }
  
 
})


  const Fort= new mongoose.model("Fort",fortsSchema)


  module.exports={Feedback,Fort}
