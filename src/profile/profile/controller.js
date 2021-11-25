import makeProfile from './profile.js';
import create from './use_cases/create.js';
import get from './use_cases/get.js'
import edit from './use_cases/edit.js'

export default ({ repository }) => {

  const createProfile = (req, res, next) => {
    const createProfileCase = create({ repository, makeProfile });
    const userId = req.userId;
    const { name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude } = req.body;
    var image_url = req.body.image_url;
    if (image_url == undefined || image_url == '')
      image_url = 'https://img-0.journaldunet.com/q_Px3oiB1PHu5hFllyEMYqDLcPw=/1080x/smart/925a5b0ae0034281b2e83af34d80339d/ccmcms-jdn/10747834.jpg';
    createProfileCase.execute( userId, image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const updateProfile = (req, res, next) => {
    const updateProfileCase = edit({ repository });
    const userId = req.userId;
    const { image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude } = req.body;
    updateProfileCase.execute( userId, image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const getProfile = (req, res, next) => {
    const createProfileCase = get({ repository });
    let userId = req.userId;
    const { profileId } = req.query;
    if (profileId)
      userId = profileId;
    createProfileCase.execute( userId )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  return Object.freeze({
    createProfile,
    getProfile,
    updateProfile
  })
}