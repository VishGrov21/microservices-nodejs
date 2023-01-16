import mongoose, { version } from "mongoose";
import { Password } from "../services/password";

// Three interfaces are required while creating a model using TS
// 1. Attributes Interface
// 2. Document Interface
// 3. Model Interface

// An interface describes the properties to create a new user
interface userAttributes {
  email: string;
  password: string;
}

// An interface describes the properties user model possess
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: userAttributes): UserDoc;
}

// An interface that describes the properties which a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
    },
    versionKey: false,
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

userSchema.statics.create = (attrs: userAttributes) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

export { User };
