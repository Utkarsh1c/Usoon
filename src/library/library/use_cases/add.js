export default ({ repository, makeBook }) => {
  async function execute( userId, image_url, name, author, genre, description, book_url ) {

    const newBook = makeBook({ userId, image_url, name, author, genre, description, book_url });
    // store data in db
    const book = await repository.create(newBook);
    return {
      book: book
    }
  }

  return { execute }
}