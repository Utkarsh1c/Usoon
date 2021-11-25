export default ({ repository, makeExperience }) => {
    async function execute( userId, image_url, country, visit_date, description, is_best_trip ) {

      const newExperience = makeExperience({ userId, image_url, country, visit_date, description, is_best_trip: false });
      // store data in db
      const experience = await repository.create(newExperience);
      return {
        experience: experience
      }
    }
  
    return { execute }
  }