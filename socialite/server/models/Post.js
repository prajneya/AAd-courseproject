const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  title: String,
  body: String,
  email: String,
  createdAt: String,
  answers: [
    {
      body: String,
      email: String,
      upvotes: [
        {
          email: String,
          createdAt: String
        }
      ],
      downvotes: [
        {
          email: String,
          createdAt: String
        }
      ],
      createdAt: String
    }
  ],
  reports: [
    {
      body: String,
      email: String,
      createdAt: String
    }
  ],
  upvotes: [
    {
      email: String,
      createdAt: String
    }
  ],
  downvotes: [
    {
      email: String,
      createdAt: String
    }
  ],
  tags: {}
});

const Queue = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: 'Post' },
  createdAt: String
});

const Tags = new Schema({
  name: String,
  weekly: Number,
  lifetime: Number
});

module.exports = {Post: model('Post', postSchema), Queue: model('Queue', Queue, 'Queue'), Tags: model('Tags', Tags, 'Tags')};