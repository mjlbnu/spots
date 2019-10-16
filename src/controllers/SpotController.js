const User = require('../models/User');
const Spot = require('../models/Spot');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'mjlbnu',
  api_key: '774422371536597',
  api_secret: '4y-EEYHYRG2GQn5EKrteQzyFAyM',
});

module.exports = {
  async index(request, response) {
    const { tech } = request.query;

    const spots = await Spot.find({ techs: tech });

    return response.json(spots);
  },

  async store(request, response) {
    const { filename } = request.file;
    const { company, techs, price } = request.body;
    const { user_id } = request.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    // upload image to Cloudinary
    const path = request.file.path;
    var secure_url = '';
    cloudinary.uploader.upload(
      path,
      { public_id: `spots/${filename}` },
      function(err, image) {
        if (err) return response.send(err);
        console.log('file uploaded to Cloudinary');
        //console.log(image.secure_url);
        secure_url = image.secure_url;
        console.log('secure_url>');
        console.log(secure_url);
        /* remove file from server
        const fs = require('fs')
        fs.unlinkSync(path)
         return image details
        res.json(image)*/
      }
    );

    console.log('secure_url:');
    console.log(secure_url);
    secure_url =
      'https://res.cloudinary.com/mjlbnu/image/upload/v1571193590/spots/dog3-1571193588734.jpg.jpg';

    const spot = await Spot.create({
      user: user_id,
      thumbnail: secure_url,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price,
    });

    return response.json(spot);
  },
};
