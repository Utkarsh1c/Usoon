export default ({ repository, makeProfile }) => {
  async function execute( userId, image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies, friends_see_tagged_photos, current_latitude, current_longitude ) {

    const newProfile = makeProfile({ id: userId, image_url, name, phone, country, city, state, languages, home_latitude, home_longitude, bio, friends_see_selfies : true, friends_see_tagged_photos : true, current_latitude, current_longitude });
    console.log(newProfile);
    await repository.create(newProfile);
    return {
      profile: newProfile
    }
  }

  return { execute }
}