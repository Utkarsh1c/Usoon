import makeExperience from './experience.js';
import add from './use_cases/add.js';
import get from './use_cases/get.js';
import del from './use_cases/del.js';
import edit from './use_cases/edit.js';
import toggle from './use_cases/toggle.js'

export default ({ repository }) => {

  // adds experience in db
  const addExperience = (req, res, next) => {
    const addExperienceCase = add({ repository, makeExperience });
    const userId = req.userId;
    const { image_url, country, visit_date, description, is_best_trip } = req.body;
    addExperienceCase.execute( userId, image_url, country, visit_date, description, is_best_trip )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  // get experience from a user
  const getExperiences = (req, res, next) => {
    const getExperiencesCase = get({ repository });
    let userId = req.userId;
    const { profileId } = req.query;
    if (profileId)
      userId = profileId;
    getExperiencesCase.execute( userId )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  // delete a user experience
  const deleteExperience = (req, res, next) => {
    const deleteExperienceCase = del({ repository });
    const { id } = req.query;
    deleteExperienceCase.execute( id )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const editExperience = (req, res, next) => {
    const editExperienceCase = edit({ repository, makeExperience });
    const { id } = req.query;
    const userId = req.userId;
    const { image_url, country, visit_date, description, is_best_trip } = req.body;
    editExperienceCase.execute( id, userId, image_url, country, visit_date, description, is_best_trip )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const toggleBestExperience = (req, res, next) => {
    const toggleBestExperienceCase = toggle({ repository });
    const { id } = req.query;
    toggleBestExperienceCase.execute( id )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  return Object.freeze({
    addExperience,
    getExperiences,
    deleteExperience,
    editExperience,
    toggleBestExperience
  })
}