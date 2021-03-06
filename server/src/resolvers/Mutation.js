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
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  async updateUserAvatar(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that.");
    }

    return ctx.db.mutation.updateUser(
      {
        data: {
          avatar: args.avatar
        },
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async login(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const user = await ctx.db.query.user({ where: { email: args.email } });

    if (!user) {
      throw new Error("No such user found");
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("Incorrect username and password combination");
    }

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "You are now logged out" };
  },
  async createMeetup(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that.");
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
  },
  async updateMeetup(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that.");
    }

    const updates = { ...args };
    delete updates.id;

    return ctx.db.mutation.updateMeetup(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async attending(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that.");
    }

    const meetupExists = await ctx.db.exists.Meetup({ id: args.id });

    if (!meetupExists) {
      throw new Error("No meetup found");
    }

    return ctx.db.mutation.updateMeetup(
      {
        where: { id: args.id },
        data: {
          attendees: {
            connect: {
              id: ctx.request.userId
            }
          }
        }
      },
      info
    );
  },
  async notAttending(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that.");
    }

    const meetupExists = await ctx.db.exists.Meetup({ id: args.id });

    if (!meetupExists) {
      throw new Error("No meetup found");
    }

    return ctx.db.mutation.updateMeetup(
      {
        where: { id: args.id },
        data: {
          attendees: {
            disconnect: {
              id: ctx.request.userId
            }
          }
        }
      },
      info
    );
  }
};

module.exports = Mutations;
