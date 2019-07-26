import mongoose from 'mongoose';

export default (connectionString: string) => {
    return mongoose.connect(connectionString, {
            useNewUrlParser: true
        });
}