// Dependencies
const express = require('express');
const morgan = require('morgan');
const app = express();
// Routes
const employee = require('./routes/employee');
const user = require('./routes/user');
// Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', index);
app.use("/admi", user);
app.use(auth);
app.use("/empleados", employee);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => { 
    console.log('Server is running...');
})
