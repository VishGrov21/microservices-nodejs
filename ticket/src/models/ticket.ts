import mongoose from "mongoose";

// Three interfaces are required while creating a model using TS
// 1. Attributes Interface
// 2. Document Interface
// 3. Model Interface

interface TicketAttributes {
  title: string;
  price: number;
  userId: string;
}

interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttributes): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Mongoose Type
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        // ret is the object that is about to be turned into JSON
        ret.id = ret._id;
        delete ret._id;
      },
    },
    versionKey: false,
  }
);

ticketSchema.statics.create = (attrs: TicketAttributes) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
