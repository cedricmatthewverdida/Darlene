import express from 'express'
import cors from 'cors'
// import connection from './database'
import auth from "./routes/jwAuth";
const app = express()

app.use(cors());
app.use(express.json());


app.use("/auth", auth);



// app.post("/register" , async (req,res) => {
//     try{
//         const fullname = req.body.name;
//         const email = req.body.email;
//         const password = req.body.pass;
//         const role = req.body.role;

//         const Execute = await connection.query(
//             "INSERT INTO logins (fullname,email,password,role) VALUES($1,$2,$3,$4) RETURNING *",
//             [fullname,email,password,role]
//         )

//         res.json(Execute);

//     }catch(err){
//         console.error(err.message);
//     }
// })


// app.post("/login" , async (req,res) => {
//     try{

//         const email = req.body.email;
//         const password = req.body.pass;

//         const Execute = await connection.query(
//             "SELECT * FROM logins WHERE email = $1 and password = $2",
//             [email,password]
//         )

//         res.json(Execute);
//     }catch(err){
//         console.error(err.message);
//     }
// })

// app.get("/auth/:id" , async (req,res) => {
//     try{

//         const { id } = req.params;
//         const Execute = await connection.query(
//             "SELECT fullname,email,role FROM logins WHERE email = $1",
//             [id]
//         )

//         res.json(Execute.rows);
//     }catch(err){
//         console.error(err.message);
//     }
// })






module.exports = {
    path: "/api/",
    handler: app
}

