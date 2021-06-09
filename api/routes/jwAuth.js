import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import connection from '../database';

import validInfo from "../middleware/validInfo";
import jwtGenerator from "../utils/jwtGenerator";
import Authorization from "../middleware/authorize";

//authorizeentication

router.post("/register",  validInfo,async (req, res) => {
  const { email, name, pass, role } = req.body;

  try {
    const user = await connection.query("SELECT * FROM logins WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(pass, salt);

    let newUser = await connection.query(
      "INSERT INTO logins (user_name,user_email,user_password,role) VALUES($1,$2,$3,$4) RETURNING *",
      [name, email, bcryptPassword,role]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, pass } = req.body;

  try {



    const user = await connection.query("SELECT * FROM logins WHERE user_email = $1", [
      email
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      pass,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    const token = jwtGenerator(user.rows[0].user_id);
    
    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



router.post("/updatename",  validInfo,async (req, res) => {
  const { id,name } = req.body;

  try {
    const user = await connection.query("SELECT * FROM logins WHERE user_id = $1", [
      id
    ]);

    if (user.rows.length > 0) {
      
      
  
      let newUser = await connection.query(
        "UPDATE logins SET user_name = $1 WHERE user_id = $2 RETURNING *",
        [name,id]
      );
  
      const token = jwtGenerator(newUser.rows[0].user_id);
  
      return res.json({ token });
      
    }else{
      return res.status(401).json("Failed to update!");
    }



  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/updatepassword",  validInfo,async (req, res) => {
  const { id,pass } = req.body;

  try {
    const user = await connection.query("SELECT * FROM logins WHERE user_id = $1", [
      id
    ]);

    if (user.rows.length > 0) {
      
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(pass, salt);
  
      let newUser = await connection.query(
        "UPDATE logins SET user_password = $1 WHERE user_id = $2 RETURNING *",
        [bcryptPassword,id]
      );
  
      const token = jwtGenerator(newUser.rows[0].user_id);
  
      return res.json({ token });
      
    }else{
      return res.status(401).json("Failed to update!");
    }



  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});



router.get("/verify",Authorization, async(req,res)=>{
    try {
        const logins = await connection.query("SELECT * FROM logins WHERE user_id = $1", 
          [req.user]
        );

        let auth = [];

        auth.push({
          'user' : true,
          'logs' : logins.rows
        })
        res.json({auth});
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
})


router.post("/tweetsave", async (req, res) => {

  const { id, tweets } = req.body;

  try {


    let createJSON = await connection.query(
      "INSERT INTO datasave (user_id,saves) VALUES($1,$2) RETURNING *",
      [id,JSON.stringify(tweets)]
    );

    return res.json({createJSON});
  

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


router.get("/approvetweetslist", async(req,res)=>{
  try {
      const tweets = await connection.query("SELECT * FROM datasave");

      res.json(tweets.rows);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
})


router.get("/registereduserlist", async(req,res)=>{
  try {

      const logins = await connection.query("SELECT user_name,user_email,role FROM logins");

      
      res.json(logins.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
})


router.post("/remove_data_save", async (req, res) => {

  const { id } = req.body;

  try {


    let createJSON = await connection.query(
      "DELETE FROM datasave WHERE id = $1",
      [id]
    );
    return res.json(createJSON.rowCount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;