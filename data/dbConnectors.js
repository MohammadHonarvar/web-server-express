import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/friends', {
  useNewUrlParser: true
});

const friendsSchema = mongoose.Schema({
  fullName: {
    type: String
  },
  gender: {
    type: String
  },
  email: {
    type: String
  },
  contacts: {
    type: Array
  }
});

const Friends = mongoose.model('friends', friendsSchema);

export { Friends };