const express = require('express')
const { Deta } = require('deta')
const { v4: uuid } = require('uuid')
const bodyParser = require('body-parser')
const config = require('dotenv/config')

const app = express()
const port = parseInt(process.env.PORT) || 8080;

app.set('view engine', 'ejs')
app.use(bodyParser.json())

const deta = Deta()
const db = deta.Base('water')

async function drinkWater(){
  await db.put({
    message: "Drink water",
    time: Date.now(),
    added: new Date(),
    key: uuid()
  })
}

async function deleteMessage(key){
  await db.delete(key)
}

async function getMessages(){
  const data = await db.fetch()
  if(data){
    return data.items
  }
  return null
}

app.get('/', async(req,res) => {
  const data = await getMessages()
  res.status(200).render("index", { data: data ? data : null } )
})

app.post('/__space/v0/actions', async (req,res) => {

  const event = req.body.event
  
  if (event.id === 'drink') {
    await drinkWater()
    return
  }
  
  if(event.id === 'delete'){
    const data = await getMessages()
    if(data){
      data.forEach( async item => {
        const day = 60**2*24
        const time = Date.now() - item.time
        if(time/day >= 1){
          await deleteMessage(item.key)
          return
        }
      })
      return
    }
    return
  }
  console.info("Hello, Actions are running. But event id's different. or something went wrong!")
  res.end()
})



app.listen(port)