export default ({ repository }) => {
  async function execute( userId ) {
    const profile = await repository.getById(userId);
    if(profile)
      return {
        profile: profile
      }
    return {
      profile: false
    }
  }

  return { execute }
}