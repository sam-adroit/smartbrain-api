const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '4d44b137201041d8b625506065e595ec'
}); 

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .then(err => res.status(400).json("Unable to work wiith API"))
}
const handleImgUrl = (req,res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
    
}

module.exports = {
    handleImgUrl,
    handleApiCall
}