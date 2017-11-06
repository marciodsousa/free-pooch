const mongoose = require('mongoose');
const Park = mongoose.model('Park');
const uuid = require('uuid');

exports.addPark = (req, res) => {
    res.render('editPark', { title: 'Add Park'});
}
  
exports.createPark = async (req, res) => {
    const park = new Park(req.body);
    await park.save();

    req.flash('success', `Successfully Created ${park.name}. Care to leave a review?`);
    res.redirect(`/parks/${park.slug}`);
}

exports.getParks = async (req, res) => {
    const parks = await Park.find();
    res.render('parks', {title: 'Parks', parks});
}

exports.editPark = async (req, res) => {
    const park = await Park.findOne({ _id: req.params.id});
    res.render('editPark', {title: `Edit ${park.name}`, park});
}

exports.updatePark = async (req, res) => {
    //se tthe location data to be a point
    req.body.location.type = 'Point';
    const park = await Park.findOneAndUpdate({ _id: req.params.id}, req.body, {
        new: true, //return the new park instead of the old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfully updated ${park.name}. <a href="/parks/${park.slug}">View Park</a>`);
    res.redirect(`/parks/${park.slug}`);
}