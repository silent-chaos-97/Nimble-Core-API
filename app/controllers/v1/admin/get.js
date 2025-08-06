
module.exports = async(req, res) => app.services.admin.get().then(data => res.status(200).json(data))
