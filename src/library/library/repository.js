export default function (database) {
  return Object.freeze({
    create,
    getByUserId,
    deleteById,
    updateById
  })

  // insert query
  function create(data) {
    return database.query().insert(data);
  }

  // find query
  function getByUserId(userId) {
    return database.query().where('userId', userId);
  }

  // delete query
  function deleteById(id) {
    return database.query().deleteById(id);
  }

  // update query
  function updateById(id, data) {
    return database.query().findById(id).patch(data);
  }

}