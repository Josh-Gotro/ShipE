// app.post('/batch', async (req, res) => {
//     const resourceUrl = req.body.resource_url;// Action
//     res.sendStatus(200); // Respond
//     console.log(req.body, resourceUrl)

//     const resourceUrlResponse = await axios({
//         method: 'get',
//         url: resourceUrl,
//         responseType: 'application/json',
//         headers: {
//             'api-key': process.env.API_KEY
//         }

//     }).catch(e => { console.log(e) })
//     console.log(resourceUrlResponse.data.label_download.pdf)

//     const labelUrl = resourceUrlResponse.data.label_download.pdf;
//     const batchId = resourceUrlResponse.data.batch_id;
//     console.log(labelURL, batchId)

//     const labelUrlResponse = await axios({
//         method: 'get',
//         url: labelUrl,
//         responseType: 'stream',
//         headers: {
//             'api-key': API_KEY
//         }
//     });

//     const dir = 'labels';

//     try {
//         if (!fs.existsSync(path.resolve(__dirname, dir,))) {
//             fs.mkdirSync(dir)
//         }
//     } catch (err) {
//         console.error('Error creating directory: ', err)
//     }

//     const filePath = path.resolve(__dirname, 'labels', `${batchId}.pdf`);
//     const writer = fs.createWriteStream(filePath, { flag: 'wx' });

//     labelUrlResponse.data.on('data', function (chunk) {
//         writer.write(chunk);
//     });
// })