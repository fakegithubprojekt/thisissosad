import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import connect from './db';
import mongo from 'mongodb';
import auth from './auth';
import nodemailer from 'nodemailer'

const app = express(); // instanciranje aplikacije
const port = 3000; // port na kojem će web server slušati

app.use(cors());
app.use(express.json()); // automatski dekodiraj JSON poruke



app.patch('/posts/:id', [auth.verify], async (req, res) => {
    let doc = req.body;
    delete doc._id;
    let id = req.params.id;
    let db = await connect();

    let result = await db.collection('projekt').updateOne(
        { _id: mongo.ObjectId(id) },
        {
            $set: doc,
        }
    );
    if (result.modifiedCount == 1) {
        res.json({
            status: 'success',
            id: result.insertedId,
        });
    } else {
        res.json({
            status: 'fail',
        });
    }
});

app.patch('/users/:id', [auth.verify], async (req, res) => {
    let doc = req.body;
    delete doc._id;
    let id = req.params.id;
    let db = await connect();

    let result = await db.collection('users').updateOne(
        { _id: mongo.ObjectId(id) },
        {
            $set: doc,
        }
    );
    if (result.modifiedCount == 1) {
        res.json({
            status: 'success',
            id: result.insertedId,
        });
    } else {
        res.json({
            status: 'fail',
        });
    }
});

app.patch('/prijavenaoglas/:id', [auth.verify], async (req, res) => {
    let doc = req.body;
    delete doc._id;
    let id = req.params.id;
    let db = await connect();

    let result = await db.collection('prijavenaoglas').updateOne(
        { _id: mongo.ObjectId(id) },
        {
            $set: doc,
        }
    );
    if (result.modifiedCount == 1) {
        res.json({
            status: 'success',
            id: result.insertedId,
        });
    } else {
        res.json({
            status: 'fail',
        });
    }
});


app.post('/postsk', [auth.verify], async (req, res) => {
    let db = await connect();
    let doc = req.body;

    let result = await db.collection('korisnici').insertOne(doc);
    if (result.insertedCount == 1) {
        res.json({
            status: 'success',
            id: result.insertedId,
        });
    } else {
        res.json({
            status: 'fail',
        });
    }
});
app.post('/posts', [auth.verify], async (req, res) => {
    let db = await connect();
    let doc = req.body;

    let result = await db.collection('projekt').insertOne(doc);
    if (result.insertedCount == 1) {
        res.json({
            status: 'success',
            id: result.insertedId,
        });
        const output = `
        <h1>Oglas koji ste postavili sadrži:</h1>
        <p>Poslodavac:${req.body.poslodavac}</p>
        <p>Oib:${req.body.oib}</p>
        <p>Telefonski broj:${req.body.brtel}</p>
        <p>Vrsta posla:${req.body.vrsta}</p>
        <p>Grad:${req.body.grad}</p>
        <p>Putni troškovi:${req.body.putni}</p>
        <p>Tip oglasa:${req.body.tipoglasa}</p>
        <p>Početak rada:${req.body.datum}</p>
        <p>Kraj rada:${req.body.datumk}</p>
        <p>Opis oglasa:${req.body.tekst}</p>`

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'projektizpi@gmail.com',
                pass: 'fakepass666',
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        let info = await transporter.sendMail({
            from: '"Zarada+" <projektizpi@gmail.com>',
            to: `${req.body.kkkoremail}`,
            subject: "Potvrda postavljanja oglasa ✔",
            text: "Automatski generirano",
            html: output,
        });

        console.log("Email poslan: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } else {
        res.json({
            status: 'fail',
        });
    }
});
app.post('/prijava', [auth.verify], async (req, res) => {
    let db = await connect();
    let doc = req.body;

    let result = await db.collection('prijavenaoglas').insertOne(doc);
    if (result.insertedCount == 1) {
        res.json({
            status: 'success',
            id: result.insertedId,
        });
        const output = `
        <h1>Oglas na koji ste prijavili sadrži:</h1>
        <p>Poslodavac:${req.body.poslodavac}</p>
        <p>Oib:${req.body.oib}</p>
        <p>Telefonski broj:${req.body.brtel}</p>
        <p>Vrsta posla:${req.body.vrsta}</p>
        <p>Grad:${req.body.grad}</p>
        <p>Putni troškovi:${req.body.putni}</p>
        <p>Tip oglasa:${req.body.tipoglasa}</p>
        <p>Početak rada:${req.body.datum}</p>
        <p>Kraj rada:${req.body.datumk}</p>
        <p>Opis oglasa:${req.body.tekst}</p>
        <h3>Razlog prijave:${req.body.prijava}</h3>`

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'projektizpi@gmail.com',
                pass: 'fakepass666',
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        let info = await transporter.sendMail({
            from: '"Zarada+" <projektizpi@gmail.com>',
            to: `${req.body.koremail}`,
            subject: "Potvrda prijave na oglas ✔",
            text: "Automatski generirano",
            html: output,
        });

        console.log("Poruka poslana: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    } else {
        res.json({
            status: 'fail',
        });
    }
});
app.get('/posts/:id', [auth.verify], async (req, res) => {
    let id = req.params.id;
    let db = await connect();
    let document = await db.collection('projekt').findOne({ _id: mongo.ObjectId(id) });

    res.json(document);
});
app.delete('/posts/:postId/comments/:commentId', async (req, res) => {
    let db = await connect();
    let postId = req.params.postId;
    let commentId = req.params.commentId;
    let result = await db.collection('projekt').updateOne(
        { _id: mongo.ObjectId(postId) },
        {
            // sada koristimo mongo direktivu $pull za micanje
            // vrijednosti iz odabranog arraya `comments`
            // komentar pretražujemo po _id-u
            $pull: { comments: { _id: mongo.ObjectId(commentId) } },
        }
    );
    if (result.modifiedCount == 1) {
        res.statusCode = 201;
        res.send();
    } else {
        res.statusCode = 500;
        res.json({
            status: 'fail',
        });
    }
});
app.get('/prijava', [auth.verify], async (req, res) => {
    let db = await connect();
    let query = req.query;
    let filter = {}
    if (query.userEmail) {
        filter["userEmail"] = new RegExp(query.userEmail)
    }
    let cursor = await db.collection("prijavenaoglas").find(filter).sort({ posted_at: -1 })
    let results = await cursor.toArray()
    results.forEach(e => {
        e.id = e._id
        delete e._id
    })
    res.json(results)
})
app.get('/mojioglasi', [auth.verify], async (req, res) => {
    let db = await connect();
    let query = req.query;
    let filter = {}
    if (query.userEmail) {
        filter["kkkoremail"] = new RegExp(query.userEmail)
    }
    let cursor = await db.collection("projekt").find(filter).sort({ posted_at: -1 })
    let results = await cursor.toArray()
    results.forEach(e => {
        e.id = e._id
        delete e._id
    })
    res.json(results)
})
app.get('/prijavenaoglas', [auth.verify], async (req, res) => {
    let db = await connect();
    let query = req.query;
    let filter = {}
    if (query.userEmail) {
        filter["koremail"] = new RegExp(query.userEmail)
    }
    let cursor = await db.collection("prijavenaoglas").find(filter).sort({ posted_at: -1 })
    let results = await cursor.toArray()
    results.forEach(e => {
        e.id = e._id
        delete e._id
    })
    res.json(results)
})
app.get('/posts', [auth.verify], async (req, res) => {
    let db = await connect();
    let query = req.query;

    let selekcija = {};

    if (query._any) {
        // za upit: /posts?_all=pojam1 pojam2
        let pretraga = query._any;
        let terms = pretraga.split(' ');

        let atributi = ['email', 'poslodavac', 'vrsta', 'tekst'];

        selekcija = {
            $and: [],
        };

        terms.forEach((term) => {
            let or = {
                $or: [],
            }

            atributi.forEach((atribut) => {
                or.$or.push({ [atribut]: new RegExp(term) });
            });

            selekcija.$and.push(or);
        });
    }
    let cursor = await db.collection('projekt').find(selekcija).sort({ posted_at: -1 });
    //let cursor=await dohvati(db).find(selekcija).sort({ posted_at: -1 })
    let results = await cursor.toArray();

    res.json(results);
});
app.get('/postsn', async (req, res) => {
    let db = await connect();
    let query = req.query;

    let selekcija = {};

    if (query._any) {
        // za upit: /posts?_all=pojam1 pojam2
        let pretraga = query._any;
        let terms = pretraga.split(' ');

        let atributi = ['email', 'poslodavac'];

        selekcija = {
            $and: [],
        };

        terms.forEach((term) => {
            let or = {
                $or: [],
            }

            atributi.forEach((atribut) => {
                or.$or.push({ [atribut]: new RegExp(term) });
            });

            selekcija.$and.push(or);
        });
    }
    let cursor = await db.collection('projekt').find(selekcija).sort({ posted_at: -1 });
    //let cursor=await dohvati(db).find(selekcija).sort({ posted_at: -1 })
    let results = await cursor.toArray();

    res.json(results);
});

app.post('/posts/:postId/comments', [auth.verify], async (req, res) => {
    let db = await connect();
    let doc = req.body;
    let postId = req.params.postId;

    doc._id = mongo.ObjectId();

    // datume je ispravnije definirati na backendu
    doc.posted_at = Date.now();
    let result = await db.collection('projekt').updateOne(
        { _id: mongo.ObjectId(postId) },
        {
            // operacija $push dodaje novu vrijednost u
            // atribut `comments`, a ako on ne postoji
            // automatski ga stvara i postavlja na []
            $push: { comments: doc },
        }
    );
    if (result.modifiedCount == 1) {
        res.json({
            status: 'success',
            id: doc._id, // kao id vraćamo generirani _id
        });
    } else {
        res.statusCode = 500;
        res.json({
            status: 'fail',
        });
    }
});
app.post('/users', async (req, res) => {
    let user = req.body;
    let id;
    try {
        id = await auth.registerUser(user);
    } catch (e) {
        res.status(500).json({ error: e.message })
    }

    res.json({ id: id })
})
app.post("/auth", async (req, res) => {
    let user = req.body;
    try {
        let result = await auth.authenticateUser(user.email, user.password);
        res.json(result);
    } catch (e) {
        res.status(401).json({ error: e.message })
    }
})
app.patch("/user", [auth.verify], async (req, res) => {
    let changes = req.body;
    let email = req.jwt.email;
    if (changes.new_password && changes.old_password) {
        let result = await auth.changeUserPassword(email, changes.old_password, changes.new_password)
        if (result) {
            res.status(201).send()
        }
        else {
            res.status(500).json({ error: 'cannot change password' })
        }
    }
    else {
        res.status(400).json({ error: 'krivi upit' })
    }

})
app.get("/tajna", [auth.verify], (req, res) => {
    res.json({ message: "Ovo je tajna " + req.jwt.username })
})
app.listen(port, () => console.log(`Slušam na portu ${port}!`));
