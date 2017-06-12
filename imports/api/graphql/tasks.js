import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

export const typeDefs = `
                # Description for the type task 123
                type Task {
                  _id: String
                  text: String
                  complete: Boolean
                  catId: String
                  userId: String
                }
                type Query {
                  tasks : [Task]
                  task (
                    tId: String!
                  ): Task
                }
                type Mutation {
                  createTask (
                    text: String!
                  ): String
                }
              `;

export const resolvers = {
    Query: {
        tasks(root, { userId }, context) {
            return Tasks.find({})
                .fetch();
        },
        task(root, { tId }, context) {
            return Tasks.findOne({ _id: tId });
        },
    },
    Mutation: {
        createTask: (root, { text }, context) => {
            return Tasks.insert({ text, complete: false, userId: context.user._id });
        },
    }
};
