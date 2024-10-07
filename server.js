const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send("Welcome to the Lab!")
})

/* Be Polite, Greet the User */

app.get('/greetings/:username', (req, res) => {
    res.send(`What a pleasure to meet you, ${req.params.username}!`)
})

/* Rolling the dice */

app.get('/roll/:maxNum', (req, res) => {
    let maxNum = req.params.maxNum
    // Found Number.isInteger() here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
    if (Number.isInteger(maxNum)) {
        randNum = Math.floor(Math.random() * maxNum)
        res.send(`Rolling dice between 0 and ${maxNum}... You got a ${randNum}!`)
    } else {
        res.send(`You need to give us a number! "${maxNum}" is not a number! You realize how hard these errors are on our servers!?`)
    }
})

/* I Want THAT One! */

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


app.get('/collectibles/:index', (req, res) => {
    let i = req.params.index
    let arrayLength = collectibles.length - 1
    if (i <= arrayLength) {
        res.send(`[Item #${i}]: ${collectibles[i].name}, [In stock] [Sold for $${collectibles[i].price}]`)
    } else {
        res.send(`Item #${i} isn't in stock, sign up to be notified as soon as it is!`)
    }
    res.send('Kek')
})

/* Filter Shoes by Query Parameters */

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    /* This was incredibly difficult and I resorted to asking chatGPT for help, I only took it's suggestion to default min and max price values */
    /* Because it's answer code was beyond my understanding and preference, and to be frank made no sense. */
    /* https://chatgpt.com/share/67043a47-7f18-8012-8b0b-c8cacdf7aa0f */
    
    const minPrice = req.query.minPrice || 0 //ChatGPT suggestion
    const maxPrice =  req.query.maxPrice || Infinity //ChatGPT suggestion

    const shoeType = req.query.type
    let output = []

    /* My original idea was to create an output array, and print it out IF it had anything in it */

    if (shoeType) {
        for (shoe of shoes) {
            if (shoe.type === shoeType && shoe.price >= minPrice && shoe.price <= maxPrice) {
                output.push(shoe)
            }}

            /* It took me a while to realize, by myself, that if there was no shoe type specified, NO FILTERING happened. 
            Manually added this else statement */

        } else {

        for (shoe of shoes) {
            if (shoe.price >= minPrice && shoe.price <= maxPrice) {
                output.push(shoe)
            }}
        }

    if (output != []) {
        res.send(output)
    } else {
        res.send(shoes)
}
})

app.get('/*', (req, res) => {
    res.send("404 - Page not found")
})

