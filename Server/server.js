import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

con.connect(function(err) {
    if(err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

app.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee where id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, address, salary } = req.body;

    // You can build the query dynamically based on the provided fields
    let sql = "UPDATE employee SET";
    const values = [];

    if (name) {
        sql += " name = ?,";
        values.push(name);
    }

    if (email) {
        sql += " email = ?,";
        values.push(email);
    }

    if (address) {
        sql += " address = ?,";
        values.push(address);
    }

    if (salary) {
        sql += " salary = ?,";
        values.push(salary);
    }

    // Remove the trailing comma in the SQL query
    sql = sql.slice(0, -1);

    // Add the WHERE clause to update the specific employee by ID
    sql += " WHERE id = ?";
    values.push(id);

    con.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ Error: "Update employee error in SQL" });
        }
        return res.json({ Status: "Success" });
    });
});



import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asir4937@gmail.com',
    pass: 'yavjzgbvqduyhylw'
  }
});

// Define a route to handle the form submission and send the email
app.post('/send_email', (req, res) => {
  const { name, email, comments } = req.body;

  // Create the email message using HTML
  const htmlMessage = `
    <h2>Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Comments:</strong> ${comments}</p>
  `;

  // Set up the mail options
  const mailOptions = {
    from: '${email}',
    to: 'asir4937@gmail.com',
    subject: 'Contact Form Submission',
    html: htmlMessage
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.json({ success: false });
    } else {
      console.log("Email sent:", info.response);
      res.json({ success: true });
    }
  });
});


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete From employee WHERE id = ?";
    con.query(sql, [req.body.salary, id], (err, result) => {
        if(err) return res.json({Error: "delete employee error in sql"});
        return res.json({Status: "Success"})
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are no Authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        } )
    }
}

app.get('/dashboard',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.id})
})


app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from users";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})
app.get('/employeeCount', (req, res) => {
    const sql = "Select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.get('/salary', (req, res) => {
    const sql = "Select sum(salary) as sumOfSalary from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Error in runnig query"});
        return res.json(result);
    })
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ? AND  password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

app.post('/signup',(req, res) => {
    console.log('Received data from frontend:', req.body);
    
    const sql = "INSERT INTO users (email, password) VALUES (?)";
    const values = [       // Extract the value from the array
      req.body.email[0],      // Extract the value from the array
      req.body.password[0],   // Extract the value from the array
    ];
    con.query(sql, [values], (err, data) => {
        if(err){
            console.error('Database Error:', err);
            return res.status(500).json('Error occurred while inserting data.');
        }
        return res.json(data);
    })
})

app.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM employee Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].password, (err, response)=> {
                if(err) return res.json({Error: "password error"});
                if(response) {
                    const token = jwt.sign({role: "employee", id: result[0].id}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success", id: result[0].id})
                } else {
                    return res.json({Status: "Error", Error: "Wrong Email or Password"});
                }
                
            })
            
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.post('/create',upload.single('image'), (req, res) => {
    //insert data into database
     const sql = "INSERT INTO employee (`name`,`email`,`password`, `address`, `salary`, `image`) VALUES (?)";
    //hashing the password 
     bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({Error: "Error in hashing password"});
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inside singup query"});
            return res.json({Status: "Success"});
        })
    } )
    
})

app.post('/send_email', async (req, res) => {
    const { name, email, comments } = req.body;
  
    try {
      // Call the sendEmail function with the extracted data
      await sendEmail(name, email, comments);
  
      // Send a success response to the client
      res.json({ success: true });
    } catch (error) {
      // If there's an error, send an error response to the client
      console.error("Error:", error);
      res.json({ success: false, error: "Unable to send email." });
    }
  });
  

app.listen(8081, ()=> {
    console.log("Running");
})