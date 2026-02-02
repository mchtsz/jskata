import express from "express"
import path from "path"

const app  = express()
const port = 3000

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define static directories
const public_files = express.static('public')
const pages        = express.static('pages')
const scripts      = express.static('scripts')
const styles       = express.static('styles')

// Use static directories
app.use(pages)
app.use(public_files)
app.use(scripts)
app.use(styles)

// Set EJS as the templating engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Root route
app.get('/', (req, res) => {
  res.render('index')
})

// Defined views for routing
const views = ["index", "about", "learn", "login"]
const accountViews = ["dashboard", "settings", "profile"]

// Dynamic routing based on views array
app.get('/:page', (req, res) => {
  const page = req.params.page
  if (views.includes(page)) {
    res.render(page)
  } else {
    res.render('404')
  }
})

// Dynamic routing for account pages
app.get('/account/:page', (req, res) => {
  const page = req.params.page
  if (accountViews.includes(page)) {
    res.render(`account/${page}`)
  } else {
    res.render('404')
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})