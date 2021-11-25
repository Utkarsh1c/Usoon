export default ({ repository }) => {

  const getFriends = (req, res, next) => {
    // const createProfileCase = get({ repository });
    const userId = req.userId;

    repository.fetchFriends( userId )
      .then(
        result => { res.json({
          friends: result
        }) },
        err => { next(err) }
      );
  }

  const addFriend = (req, res, next) => {
    // const createProfileCase = get({ repository });
    const userId = req.userId;
    const { add1, add2 } = req.body;

    repository.addFriend( add1, add2 )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const removeFriend = (req, res, next) => {
    const userId = req.userId;
    const { friendId } = req.query;

    repository.removeFriend( userId, friendId )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const toggleCloseFriend = (req, res, next) => {
    const userId = req.userId;
    const { friendId } = req.query;

    repository.getValue( userId, friendId )
      .then(
        result => repository.toggleFriend( userId, friendId, !result[0].isCloseFriend )
      )
      .then(
        result => { res.json(result) },
      )
      .catch(err => { next(err) })
  }

  return Object.freeze({
    getFriends,
    addFriend,
    removeFriend,
    toggleCloseFriend
  })
}