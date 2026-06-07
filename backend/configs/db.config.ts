import mongoose from 'mongoose';

export const DB_STATUS = {
    DISCONNECTED: 0,
    CONNECTED: 1,
    CONNECTING: 2,
    DISCONNECTING: 3,
} as const;

export const initDB = () => {
    async function connect() {
        await mongoose.connect(process.env.MONGO_URI);
    }

    connect()
        .then(() => {
            console.log('DB connected successfully');
        })
        .catch((err: unknown) => {
            if (err instanceof mongoose.mongo.MongoServerError) {
                console.log(err.errorResponse);
            }
        });
};

export const checkDb = async (): Promise<boolean> => {
    try {
        const isConnected =
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
            mongoose.connection.readyState === DB_STATUS.CONNECTED;

        if (!isConnected) return false;

        await mongoose.connection.db?.admin().ping();
        return true;
    } catch {
        return false;
    }
};
