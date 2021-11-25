export default ({ repository, makeBook }) => {
    async function execute( id, userId, image_url, name, author, genre, description, book_url ) {

      await repository.deleteById(id);
      const newBook = makeBook({ userId, image_url, name, author, genre, description, book_url });
      const book = await repository.create(newBook);
      return {
        book: book
      }
    }
  
    return { execute }
  }