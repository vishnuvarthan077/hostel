const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/hostelManagement")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// ------------------ SCHEMAS ------------------

const studentSchema = new mongoose.Schema({
name:String,
age:Number,
room_no:Number,
department:String,
phone:String
})

const staffSchema = new mongoose.Schema({
staff_id:Number,
name:String,
role:String,
phone:String,
salary:Number,
shift:String
})

const roomSchema = new mongoose.Schema({
room_no:Number,
type:String,
capacity:Number,
available:Boolean
})

const feeSchema = new mongoose.Schema({
student_name:String,
amount:Number,
month:String,
status:String
})

// ------------------ MODELS ------------------

const Student = mongoose.model("students", studentSchema)
const Staff = mongoose.model("staff", staffSchema)
const Room = mongoose.model("rooms", roomSchema)
const Fee = mongoose.model("fees", feeSchema)

// ------------------ STUDENT CRUD ------------------

// CREATE
app.post("/addStudent", async(req,res)=>{
const data = new Student(req.body)
await data.save()
res.send("Student Added")
})

// READ
app.get("/students", async(req,res)=>{
const data = await Student.find()
res.json(data)
})

// UPDATE
app.put("/updateStudent/:id", async(req,res)=>{
await Student.findByIdAndUpdate(req.params.id, req.body)
res.send("Student Updated")
})

// DELETE
app.delete("/deleteStudent/:id", async(req,res)=>{
await Student.findByIdAndDelete(req.params.id)
res.send("Student Deleted")
})

// ------------------ STAFF CRUD ------------------

app.post("/addStaff", async(req,res)=>{
const data = new Staff(req.body)
await data.save()
res.send("Staff Added")
})

app.get("/staff", async(req,res)=>{
const data = await Staff.find()
res.json(data)
})

app.put("/updateStaff/:id", async(req,res)=>{
await Staff.findByIdAndUpdate(req.params.id, req.body)
res.send("Staff Updated")
})

app.delete("/deleteStaff/:id", async(req,res)=>{
await Staff.findByIdAndDelete(req.params.id)
res.send("Staff Deleted")
})

// ------------------ ROOM CRUD ------------------

app.post("/addRoom", async(req,res)=>{
const data = new Room(req.body)
await data.save()
res.send("Room Added")
})

app.get("/rooms", async(req,res)=>{
const data = await Room.find()
res.json(data)
})

app.put("/updateRoom/:id", async(req,res)=>{
await Room.findByIdAndUpdate(req.params.id, req.body)
res.send("Room Updated")
})

app.delete("/deleteRoom/:id", async(req,res)=>{
await Room.findByIdAndDelete(req.params.id)
res.send("Room Deleted")
})

// ------------------ FEES CRUD ------------------

app.post("/addFee", async(req,res)=>{
const data = new Fee(req.body)
await data.save()
res.send("Fee Added")
})

app.get("/fees", async(req,res)=>{
const data = await Fee.find()
res.json(data)
})

app.put("/updateFee/:id", async(req,res)=>{
await Fee.findByIdAndUpdate(req.params.id, req.body)
res.send("Fee Updated")
})

app.delete("/deleteFee/:id", async(req,res)=>{
await Fee.findByIdAndDelete(req.params.id)
res.send("Fee Deleted")
})

// ------------------ SERVER ------------------

app.listen(3000, ()=>{
console.log("Server running on port 3000")
})