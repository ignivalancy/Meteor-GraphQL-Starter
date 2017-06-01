import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

const Task = `
          type Task {
            _id: String
            text: String
            complete: Boolean
            catId: String
            userId: String
          }`;

const TaskQuery = `
          type Query {
            tasks : [Task]
            task (
              tId: String!
            ): Task
          }`;

const TaskMutation = `
          type Mutation {
            createTask (
              text: String!
            ): String
          }`;

const SchemaDefinition = `
          schema {
            query: Query
            mutation: Mutation
          }`;

export const typeDefs = [SchemaDefinition, Task, TaskQuery, TaskMutation]

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
