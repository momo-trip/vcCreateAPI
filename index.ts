import express from 'express'
import createProof from './createProof';


const app: express.Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//CORS対応（本番環境では見直し）
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.listen(3000, () => {
    console.log("Start on port 3000.")
})


app.post('/create_vc', async function(req, res) {
    const proof = await createProof(
        req.body.pk,
        req.body.sk,
        req.body.messages,
    );

    res.json({
        "proof": proof
    });
})
