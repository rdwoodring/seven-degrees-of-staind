import mongoose from 'mongoose';

export default (connectionString: string) => {
    return mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
}