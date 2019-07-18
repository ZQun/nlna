import { Application } from 'midway'

module.exports = (app: Application) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
  
    const UserSchema = new Schema({
        email: { type: String  },
        code: { type: String  },
        data: { type: Number },
        islive: { type: Boolean },
        password: { type: String }
    });
  
    return mongoose.model('User', UserSchema);
}