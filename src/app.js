const express = require('express');
const app = express();
const path = require('path');
const  methodOverride = require('method-override')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const accessMiddleware = require('./middleware/accessMiddleware');

//motor de plantilla
app.set('views engine','ejs');
app.set('views',path.resolve(__dirname,'views'));

//carpeta publica
app.use(express.static('public'));

//para usar la informacion
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret: "123",
    resave: false,
    saveUninitialized: true
}))

app.use(cookieParser())
//middleware de session
app.use(accessMiddleware)

//override
app.use(methodOverride('_method'));

//requerimos rutas main
const routerPages = require('./routes/pagesRoutes');
//requerimos router perfil
const routerPerfil= require('./routes/perfilRoutes')
//requerimos router admin
const routerAdmin= require('./routes/adminRoutes')
//ruta de productos
const routerProducts=require('./routes/productsRoutes')
//router category
const routerCategory = require('./routes/categoryRoutes')
app.use('/',routerPages);
app.use('/perfil',routerPerfil);
app.use('/admin',routerAdmin);
app.use('/products',routerProducts)
app.use('/category',routerCategory)



app.listen(process.env.PORT || 3001, () => console.log('servidor funcionando'));