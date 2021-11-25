export default function (database) {
  return Object.freeze({
    create,
    getByUserId,
    deleteById,
    updateById,
    updateByUserId,
    fetchFriends,
    addFriend,
    getById,
    removeFriend,
    getValue,
    toggleFriend    
  })

  // insert query
  function create(data) {
    return database.query().insert(data);
  }

  // find query
  function getByUserId(userId) {
    return database.query().where('userId', userId);
  }

  function getById(userId) {
    return database.query().findById(userId)
  }

  // delete query
  function deleteById(id) {
    return database.query().deleteById(id);
  }

  function updateById(userId, data) {
    return database.query().findById(userId).patch(data);
  }

  function updateByUserId(userId, data) {
    return database.query().patch(data).where('userId', userId);
  }

  function fetchFriends(userId) {
    return database.relatedQuery('friends').for(database.query().where('userId', userId)).select('id', 'image_url', 'name', 'isCloseFriend', 'country', 'continent', 'added_at')
  }

  function addFriend(add1, add2) {
    return database.relatedQuery('friends').for(add1).relate(add2);
  }

  function removeFriend(userId, friendId) {
    return database.relatedQuery('friends').for(userId).unrelate().where('friendId', friendId);
  }

  function getValue(userId, friendId) {
    return database.relatedQuery('friends').for(userId).where('friendId', friendId);
  }
  // 

  function toggleFriend(userId, friendId, value) {
    return database.relatedQuery('friends').for(userId).patch({ isCloseFriend: value }).where('friendId', friendId);
  }

}