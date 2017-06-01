import { Mongo } from 'meteor/mongo';

export const Categories = new Mongo.Collection('categories');

export const typeDefs = `
                type Category {
                  _id: String
                  name: String
                  userId: String
                }
                type Query {
                  categories : [Category]
                }
                type Mutation {
                    createCategory (
                      name: String!
                    ): String
                }`;

export const resolvers = {
    Query: {
        categories(root, { userId }, context) {
            return Categories.find({ userId: context.user._id })
                .fetch();
        }
    },
    Mutation: {
        createCategory: (root, { name }, context) => {
            return Categories.insert({ name, userId: context.user._id });
        },
    }
};
