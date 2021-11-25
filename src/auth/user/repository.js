export default function makeContactList(database) {
  return Object.freeze({
    create,
    createProfile,
    createAccount,
    update,
    instanceUpdate,
    getByEmail,
    getByUsername,
    getById,
    getByEmailandMethod
  })

  function create(data) {
    return database.query().insert(data);
  }

  function createProfile(userId, newProfile) {
    return database.relatedQuery('profile')
    .for(userId)
    .insert( newProfile );
  }

  function createAccount(userId, email, phone) {
    return database.relatedQuery('account_settings')
    .for(userId)
    .insert( { email: email, phone: phone } );
  }

  function getByEmail(email) {
    return database.query().findOne('email', email);
  }

  function getByEmailandMethod(email, method) {
    return database.query().findOne({ email: email, method: method });
  }

  function getByUsername(username) {
    return database.query().findOne('username', username);
  }

  function getById(userId) {
    return database.query().findById(userId)
  }

  function getByToken() {
    
  }

  function update(userId, data) {
    return database.query().patchAndFetchById(userId, data);
  }

  function instanceUpdate(userRecord, data) {
    return userRecord.$query().patchAndFetch(data);
  }

}