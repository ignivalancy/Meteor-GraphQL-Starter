import { makeExecutableSchema } from 'graphql-tools';
import { loadSchema, getSchema } from 'graphql-loader';
import { mergeModules, loadModules } from 'graphql-schema-modules';
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts'

initAccounts();

import date from './graphql/date';
import json from './graphql/json';

import user from './graphql/user';
import categories from './graphql/categories';
import tasks from './graphql/tasks';


const accounts = getSchema()

const { typeDefs, resolvers } = mergeModules([date, json, categories, tasks, user, accounts]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
