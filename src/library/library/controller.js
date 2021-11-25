import makeBook from './book.js';
import add from './use_cases/add.js';
import get from './use_cases/get.js';
import del from './use_cases/del.js';
import edit from './use_cases/edit.js';

export default ({ repository }) => {

  // adds experience in db
  const addBook = (req, res, next) => {
    const addBookCase = add({ repository, makeBook });
    const userId = req.userId;
    const { image_url, name, author, genre, description, book_url } = req.body;
    addBookCase.execute( userId, image_url, name, author, genre, description, book_url )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  // get experience from a user
  const getBooks = (req, res, next) => {
    const getBooksCase = get({ repository });
    let userId = req.userId;
    const { profileId } = req.query;
    if (profileId)
      userId = profileId;
    getBooksCase.execute( userId )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  // delete a user experience
  const deleteBook = (req, res, next) => {
    const deleteBookCase = del({ repository });
    const { id } = req.query;
    deleteBookCase.execute( id )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const editBook = (req, res, next) => {
    const editBookCase = edit({ repository, makeBook });
    const { id } = req.query;
    const userId = req.userId;
    const { image_url, name, author, genre, description, book_url } = req.body;
    editBookCase.execute( id, userId, image_url, name, author, genre, description, book_url )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  return Object.freeze({
    addBook,
    getBooks,
    deleteBook,
    editBook
  })
}