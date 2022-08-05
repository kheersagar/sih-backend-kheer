const express =require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app =express();

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static( path.join(__dirname,'public')));

