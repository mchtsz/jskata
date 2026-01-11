import express from "express"

const app = express()
const port = 3000

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Define static directories
const pages        = express.static('pages')
const public_files = express.static('public')
const scripts      = express.static('scripts')
const styles       = express.static('styles')

// Use static directories
app.use(pages)
app.use(public_files)
app.use(scripts)
app.use(styles)

// serve routes
app.get("/", (req, res) => {
  res.sendFile("index.html")
})

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`)
})