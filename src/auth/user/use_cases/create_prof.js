export default ({ repository, makeUser }) => {
    async function execute( userId, image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude ) {

        const newProfile = makeUser({ image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies : true, friends_see_tagged_photos : true, current_latitude, current_longitude });
        console.log(newProfile);
        
        const { email } = await repository.getById(userId);
        await repository.createAccount(userId, email, phone);
  
        await repository.createProfile(userId, newProfile)

        return {
            profile: newProfile
        }
    }
  
    return { execute }
  }