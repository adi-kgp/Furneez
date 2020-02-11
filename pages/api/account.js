import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  if (!('authorization' in req.headers)){
    return res.status(401).send('No authorization token');
  }
  try {
    const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET); // throws error if invalid
    const user = await User.findOne({_id: userId});
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User Not Found');
    }
  } catch (error){
    res.status(403).send('Invalid token');
  }
}