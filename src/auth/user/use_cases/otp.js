export default ({ repository, client }) => {
    async function execute(email, username, check_user) {
      const userRecord = await repository.getByEmail(email);
      const userRecord1 = await repository.getByUsername(username);
        
      if(check_user){
        if(userRecord || userRecord1)
          throw new Error('User already exists')
      }
      else
        if(!userRecord)
          throw new Error('This user does not exist')
      client
        .verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications
        .create({
          to: email,
          channel: 'email'
        })
        .then((data => {
          console.log(data);
        }))
        .catch(err => {
          throw err
        })
    }

    return { execute }
  }