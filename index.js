const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const generateAsyncApiDoc = async function() {
    const Generator = require('@asyncapi/generator');
    const path = require('path');
    const generator = new Generator('@asyncapi/html-template', path.resolve(__dirname, 'public/doc'));
    try {
        await generator.generateFromFile('schema.yml');
        console.log('Documentation generated');
    } catch (e) {
        console.error(e);
    }
}

generateAsyncApiDoc();

app.use('/doc', express.static(__dirname + '/public/doc'))

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
