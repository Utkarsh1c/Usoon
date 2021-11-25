export default function (database) {
    return Object.freeze({
      create,
      getByUserId,
      deleteById,
      updateById,
      rmBestTrip,
      makeBestTrip
    })
  
    // insert query
    function create(data) {
      return database.query().insert(data);
    }
  
    // find query
    function getByUserId(userId) {
      return database.query().where('userId', userId);
    }

    function rmBestTrip() {
      return database.query().patch({ is_best_trip: false }).where('is_best_trip', true)
    }

    function makeBestTrip(id) {
      return database.query().patchAndFetchById(id, { is_best_trip: true })
    }
  
    // delete query
    function deleteById(id) {
      return database.query().deleteById(id);
    }

    function updateById(id, data) {
      return database.query().findById(id).patch(data);
    }
  
  }