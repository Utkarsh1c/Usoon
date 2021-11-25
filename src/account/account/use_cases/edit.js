export default ({ repository, repository1, repository2 }) => {
    async function execute( userId, email, phone, alt_phone, alt_email ) {

        const data = { email, phone, alt_phone, alt_email };
        const updatedAccount = await repository.updateById(userId, data);

        await repository1.update(userId, { email });
        await repository2.updateById(userId, { phone });

        return {
          account: updatedAccount
        }
    }
  
    return { execute }
  }