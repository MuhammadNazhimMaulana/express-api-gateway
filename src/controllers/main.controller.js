
// All Data
index = async (req, res) => {
    try {

        return res.send('HELLO WORLD!');
    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}


module.exports = {
    index
}