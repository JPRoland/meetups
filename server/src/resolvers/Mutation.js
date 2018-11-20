const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password
        }
      },
      info
    );

    // create jwt to sign in new user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // Set jwt as a cookie on response
    ctx.respons.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  async createMeetup(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }

    const meetup = await ctx.db.mutation.createMeetup(
      {
        data: {
          ...args,
          organizer: {
            connect: {
              id: ctx.request.userId
            }
          }
        }
      },
      info
    );

    return meetup;
  }
};

module.exports = Mutations;
