import mongoose from 'mongoose'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { JWT_SECRET } from '../config.js'
import User from '../models/User.js'
import passport from 'passport'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}


export default passport => {
    passport.use(new JwtStrategy(opts, async (pay_load, done) => {
        const CurrentUser = await User.findById(pay_load.User_id)

        if (CurrentUser) {
            console.log(CurrentUser)
            return done(null, CurrentUser)
        }
        return done(null, false)
    }))
}