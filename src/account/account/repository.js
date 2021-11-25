export default function (database) {
    return Object.freeze({
      create,
      getByUserId,
      deleteById,
      updateById,
      getById
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
  // 
    // update query
    function updateById(userId, data) {
        return database.query().patchAndFetchById(userId, data);
    }

    //get query
    function getById(userId) {
      return database.query().findById(userId)
    }
    
  
  }