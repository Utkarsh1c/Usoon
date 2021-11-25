import makeAccount from './account.js';
import get from './use_cases/get.js'
import edit from './use_cases/edit.js';

export default ({ repository, repository1, repository2 }) => {

  const getAccount = (req, res, next) => {
    const getAccountCase = get({ repository });
    let userId = req.userId;
    getAccountCase.execute( userId )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  const editAccount = (req, res, next) => {
    const editAccountCase = edit({ repository, repository1, repository2 });
    const userId = req.userId;
    const { email, phone, alt_email, alt_phone } = req.body;
    editAccountCase.execute( userId, email, phone, alt_email, alt_phone )
      .then(
        result => { res.json(result) },
        err => { next(err) }
      );
  }

  return Object.freeze({
    getAccount,
    editAccount
  })
}