export const typeDefs = `
                # Defines a user type and its fields
                type User {
                   _id: String
                  emails: [Email]
                  profile: UserProfile
                }
                type Email {
                  address: String
                  verified: Boolean
                }
                # Defines a user profile type and its fields
                type UserProfile {
                 name: String
                }
                type Query {
                  me:User
                }`;

export const resolvers = {
    Query: {
        me(root, args, context) {
            return context.user;
        },
    },
    User: {
        emails: ({ emails }) => emails
    }
};
