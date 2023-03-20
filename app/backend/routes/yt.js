// Required Modules
const router = require('express').Router();
const youtubedl = require('youtube-dl-exec')
const logger = require('progress-estimator')()
const path = require('path');
// Required Models
let Download = require('../models/yt.model');


router.route('/').get((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'yt.html'));
});

// Save Downloads information to Database
router.route('/addDownload/').post((req, res) => {
    const urlO = req.body.url;
    let url = String(urlO)
    url = url.slice(-10)
    const format = req.body.format;
    const img = req.body.thumbnail;


    oldRecord = Download.findOne({ url: url, format: format }).then((oldRecord) => {
        Download.findOneAndUpdate({ url: url, format: format }, { "total": (oldRecord.total + 1) }, { new: true }).then(() => res.json('Record Updated!')).catch(err => res.status(400).json('Error: ' + err));

    }).catch(err => {
        const newDownload = new Download({ url, format, img, total: 1 })
        newDownload.save().then(() => res.json('Download added!')).catch(err => res.status(400).json('Error: ' + err));
    });




});

router.route('/wipeDownload/').post((req, res) => {
    Download.deleteMany({}).then(() => res.json('Downloads wiped!')).catch(err => res.status(400).json('Error: ' + err));
});


// Get all downloads from Database sorted from most downloaded to less
router.route('/getDownload/').get((req, res) => {
    Download.find().sort({ total: -1 }).then(downloads => res.json(downloads)).catch(err => res.status(400).json('Error: ' + err));

});


// YT-DLP-API

router.route('/getinfo/').post((req, res) => {
    //const url = "https://www.youtube.com/watch?v=" + req.params.url;
    const url = req.body.url;
    console.log(url);
    const promise = youtubedl(url, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: [
            'referer:youtube.com',
            'user-agent:googlebot'
        ]

    }).then(output => { res.json(output); console.log(output) }).catch(err => { res.status(400).json("Error"); console.log(err) })

    const result = logger(promise, `Obtaining ${url}`)
    //console.log(result)


});


router.route('/download/').post((req, res) => {
    console.log("CALLED TO DOWNLOAD FILE")
    const url = req.body.url;
    let id = String(url)
    id = id.slice(-10)
    console.log("ID = " + id)


    const format = req.body.format;
    //const url = "https://www.youtube.com/watch?v=" + id;
    console.log(url);

    Download.findOne({ url: url, format: format }).then((oldRecord) => {
        if (oldRecord === null) {
            const location = path.join(__dirname, '..') + "\\" + id + '-' + format + ".mp4"
            const out = { "ID": id, "Format": format, "Location": location };



            const promise = youtubedl(url, {
                output: location,
                format: format,
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                addHeader: [
                    'referer:youtube.com',
                    'user-agent:googlebot'
                ]

            }).then(output => { res.json(out); console.log(out) }).catch(err => { res.status(400).json("Error"); console.log(err) })


            const result = logger(promise, `Obtaining ${url}`)
            console.log(result)
        }
        else {
            res.json("Already Downloaded")
        }
    })




});

router.route('/downloadfile/').post((req, res) => {
    console.log("CALLED TO GET FILE")
    const url = req.body.url;
    let id = String(url)
    id = id.slice(-10)
    const format = req.body.format;
    //const url = "https://www.youtube.com/watch?v=" + id;
    console.log(url);



    const location = path.join(__dirname, '..', id + '-' + format + '.' + format)

    res.sendFile(location);


});



module.exports = router;