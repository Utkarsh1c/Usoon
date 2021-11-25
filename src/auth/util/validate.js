import pkg from 'express-validator';
const { body } = pkg;

export default (method) => {
  switch (method) {
    case 'user': {
      return [
        body('email')
          .isEmail(),
          // .trim()
          // .custom((value) => {
          //   return User.findOne({ 
          //       where: { email: value }
          //   })
          //   .then(userDoc => {
          //       if(userDoc) {
          //         throw new Error('E-mail address already exists');
          //       }
          //   })
          // }), 
        // body('phone')
        //   .not()
        //   .isEmpty(),
        body('password')
          .not()
          .isEmpty()
          .isString()
          .trim()
          .isLength({ min: 8 })
        ]
    }
  }
}