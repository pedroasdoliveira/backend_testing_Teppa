import express from "express";
import cors from 'cors'
import router from './routes'

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use('/blog', router.register, router.allUsers)

const port = 3333 || process.env.PORT;

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}.`);
})
