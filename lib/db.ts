import mongoose, { Mongoose } from 'mongoose'
import { parsedEnv } from './env'

const MONGODB_URI = parsedEnv.MONGODB_URI

type MongooseCache = {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
}

declare global {
  var mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache =
  global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null })

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
