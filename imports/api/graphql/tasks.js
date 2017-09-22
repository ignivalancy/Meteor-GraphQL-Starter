import { Categories, Tasks } from '../../collections';

export const typeDefs = `
                type CategoryInfo {
                  _id: String!
                  name: String!
                  createdAt: Date
                }
                type Task {
                  _id: String
                  title: String
                  isComplete: Boolean
                  category: CategoryInfo
                  createdAt: Date
                }
                type Query {
                  tasks : [Task]
                  task (
                    tId: String!
                  ): Task
                }
                type Mutation {
                  createTask (
                    title: String!
                    cId: String!
                  ): SuccessResponse
                  toggleTask (
                    tId: String!
                  ): SuccessResponse
                  deleteTask (
                    tId: String!
                  ): SuccessResponse
                }
              `;

export const resolvers = {
    Query: {
        tasks(root, args, context) {
            if (context.userId)
                return Tasks.find({ createdBy: context.userId })
                    .fetch();
        },
        task(root, { tId }, { userId }) {
            if (userId)
                return Tasks.findOne({ _id: tId, createdBy: userId });
        }
    },
    Mutation: {
        async createTask(root, { title, cId }, { userId }) {

            if (userId) {
                Tasks.insert({ title, isComplete: false, createdBy: userId, cId, createdAt: new Date });
                return { success: true };
            } else {
                throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
            }

        },
        async toggleTask(root, { tId }, { userId }) {

            if (userId) {
                let task = Tasks.findOne({ _id: tId, createdBy: userId });
                if (task) {
                    Tasks.update({ _id: tId }, { $set: { isComplete: !task.isComplete } });
                    return { success: true };
                } else {
                    throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");

                }
            } else {
                throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
            }

        },
        async deleteTask(root, { tId }, { userId }) {

            if (userId) {
                Tasks.remove({ _id: tId });
                return { success: true };
            } else {
                throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
            }

        }
    },
    Task: {
        category({ cId }) {
            return Categories.findOne({ _id: cId });
        }
    }
};