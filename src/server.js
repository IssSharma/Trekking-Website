require('dotenv').config();
const express = require("express");
const path = require("path")

const app = express();
const bodyparer = require("body-parser")
const { urlencoded } = require("express");
// const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 80;

const models= require('./modles/schema.js')

const mongoose = require("mongoose");
const res = require("express/lib/response");
// mongoose.connect('mongodb://localhost:27017/HikeMore',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true

//     }).then(()=>{
//     console.log("connection sucessful")
// }).catch((e)=>{
//     console.log(`connection fails${e}`)
// })
console.log(process.env.USER)
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.prhzb.mongodb.net/HikeMore?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true

    }).then(()=>{
    console.log("connection sucessful")
}).catch((e)=>{
    console.log(`connection fails${e}`)
})


app.set("view engine", "ejs",)


var multer = require('multer');
var fs = require('fs');


var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() +
		path.extname(file.originalname))
        
	}
});

var upload = multer({ 
	storage: storage,
	limits:{fileSize:9000000}
 });



const static_path = path.join(__dirname, "../public")
console.log(static_path)
app.use(express.static(static_path))
// console.log(static_path)



// console.log(viewsPath)
app.set('views', path.join(__dirname, "../src/views"));

app.get("/", (req, res) => {
    // console.log("hi")
    res.render("index.ejs")
})
app.get("/moreinfo", (req, res) => {
    // console.log("hi")
    res.render("template.ejs")
})
app.get("/feedback", (req, res) => {
    // console.log("hi")
    res.render("feedback.ejs")
})

app.post("/feedback", async (req, res) => {

    try {
        console.log(req.body)
        const feedback = new models.Feedback({
            username: req.body.username,
            email: req.body.email,
            message: req.body.message
        })
        // console.log(req.email)
        const feedbacksave = await feedback.save();
        res.redirect('/')
  } catch (error) {
         
        res.send(`some error occures ${error}`)
    }


});

app.get('/AddNewForts',(req,res)=>{
    res.render('upload.ejs')
})

app.post('/AddNewForts',upload.single('image'), async (req, res) => {

    
    
   try {
           console.log(__dirname)
           
            console.log(req.body)
            const fortModel = new models.Fort({
              
              fortsName: req.body.fortsName,     
              description :req.body.description,
              location :req.body.location,
              image: {
               data : fs.readFileSync(path.join( 'uploads/' + req.file.filename)),
               contentType: 'image/png'
                 }
       
              }) 


           
              const fortSave = await fortModel.save();
              console.log("save")

              
              
                   res.redirect("/")
 
    
        }catch(error){
             
             console.log(error)
              res.redirect('back')
  
             }
})


app.get('/showForts', async(req, res) => {
    const forts = await models.Fort.find().sort({ createdAt: 'desc' })
    res.render('showForts.ejs', {fort: forts})
})


app.get('/forts/:id', async (req, res) => {
    const forts = await models.Fort.findOne({ _id: req.params.id })

    if (forts == null) res.redirect('/')
    res.render('readMore.ejs', { fort: forts })
  })
app.listen(port, () => {
    console.log(`server is running on port number ${port}`);
})