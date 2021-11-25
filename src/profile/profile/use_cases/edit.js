export default ({ repository }) => {
    async function execute( userId, image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude ) {

      const data = { image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude };
      const updatedProfile = await repository.updateById(userId, data);
      return {
        profile: updatedProfile
      }
    }
  
    return { execute }
  }