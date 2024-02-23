const express=require('express');
const cors=require ('cors');
const app=new express();
const bodyParser=require("body-parser");
const mongoose=require('mongoose');

app.use(cors());
app.use(bodyParser.json());

let Student=require('./student.model');

mongoose.connect("mongodb+srv://khadeejasalih66:mjDRlbVChwfLMwRE@cluster0.mswsjrz.mongodb.net/studentdata?retryWrites=true&w=majority&appName=Cluster0");
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connection established successfully");
});

app.get("/",(req,res)=>{
    console.log("Request received");
    res.json("Hello World");
});

app.get("/hello",(req,res)=>{
    console.log("hello Request received");
    res.json("Welcome hi");
});

app.get("/people",(req,res)=>{
    console.log("people request received");
    res.json([{name:"Khadeeja",role:"student"},{name:"Shriya",role:"instructor"}])
});

app.get("/students",async(req,res)=>{
    console.log("students request received");
    let data=await (Student.find().catch(err=>{
        res.json("Error loading data");
    }));
    res.json(data);
//     res.json([{name:"Khadeeja",age:"21",department:"IT"},{name:"swe",age:"20",department:"IT"},{name:"Shriya",age:"20",department:"IT"}])
});

app.get('/students/:id',async(req,res)=>{
    let id=req.params.id;
    let data=await Student.findById(id).catch(err=>{
        res.json("error finding person");
    });
    if(!data){
        res.json('not found');
    }
    else{
        res.json(data);
    }
});

app.delete('/students/:id',async(req,res)=>{
    let id=req.params.id;
    await Student.findByIdAndDelete(id)
    .then(()=>{

    
        res.json("data removed successfully");
    })
    .catch(err=>{
        res.json('failed deleting data');
    });
    
    
});


app.post("/students",(req,res)=>{
    console.log(req.body);
    let student=new Student(req.body);
    student
    .save().then(()=>{
        res.json("saved successfully");}).catch(err=>{
        res.json("Error:"+err);
    });
        
});



app.listen("4000",()=>{
console.log("started server on 4000");
});
