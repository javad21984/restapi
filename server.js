const express = require('express')
const hbs = require('hbs')
const path = require('path')
const fs = require('fs')
const port = 3000;
const app = express();

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) =>{
    let now = Date().toString()
    let log = `${now} : ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('log nor write for Error:' + err)
        }
    })
    next()
})

app.use((req, res, next) =>{
    res.render('infix.hbs')
})

hbs.registerPartials(path.join(__dirname, 'views/partials'))
hbs.registerHelper('date', () =>{
    return new Date().getFullYear()
})
app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'صفحه اصلی',
        title: 'سیستم'
    })
})
app.get('/app', (req, res) =>{
    res.send('Thats my app')
})

app.listen(port, () =>{
    console.log('Server is Run')
})