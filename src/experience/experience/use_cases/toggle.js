export default ({ repository }) => {
    async function execute( id ) {

      const experienceRecord = await repository.rmBestTrip();
      const experienceRecord1 = await repository.makeBestTrip(id);
      return {
        experience: experienceRecord1
      }
    }
  
    return { execute }
  }