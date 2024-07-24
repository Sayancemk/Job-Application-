import app from './app.js';

dotenv.config();     
        
app.listen(PORT,(err  )=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Server is running on PORT Number${process.env.PORT}`)
    }
})