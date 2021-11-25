export default ({ repository, makeExperience }) => {
    async function execute( id, userId, image_url, country, visit_date, description, is_best_trip ) {

      await repository.deleteById(id);
      const newExperience = makeExperience({ userId, image_url, country, visit_date, description, is_best_trip });
      // store data in db
      const experience = await repository.create(newExperience);
      return {
        experience: experience
      }
    }
  
    return { execute }
  }