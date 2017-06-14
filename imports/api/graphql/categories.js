import { Meteor } from 'meteor/meteor'
import { Categories, Tasks } from '../../collections';

export const typeDefs = `
                type Category {
                  _id: String!
                  name: String!
                  userInfo: UserProfile
                  createdAt: Date
                  taskList: [Task] # the list of Task by this category
                }
                type Query {
                  categories : [Category]
                  category (
                    cId: String!
                  ): Category
                }
                type Mutation {
                    createCategory (
                      name: String!
                    ): SuccessResponse
                }`;

export const resolvers = {
    Query: {
        categories(root, args, { userId }) {
            if (userId)
                return Categories.find({ createdBy: userId })
                    .fetch();
        },
        category(root, { cId }, { userId }) {
            if (userId)
                return Categories.findOne({ _id: cId, createdBy: userId });
        }
    },
    Mutation: {
        async createCategory(root, { name }, { userId }) {
            if (userId) {
                Categories.insert({ name, createdBy: userId, createdAt: new Date });
                return { success: true };
            } else {
                throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
            }
        },
    },
    Category: {
        taskList({ _id }) {
            return Tasks.find({ cId: _id })
                .fetch();
        },
        userInfo({ createdBy }) {
            return Meteor.users.findOne(createdBy).profile;
        },
    }
};
