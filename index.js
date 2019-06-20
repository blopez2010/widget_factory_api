const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { importSchema } = require('graphql-import');
const { GraphQLScalarType } = require('graphql');
const widgetMutations = require('./mutations');
const {
  getCategories,
  getWidgets,
  getOrders,
  getCategoryById,
  getWidgetById,
  getOrderByOrderNumber,
  searchWidgets
} = require('./db/models');

require('dotenv').config();

const resolvers = {
  Query: {
    searchWidgets: (parent, { search }) => searchWidgets(search),
    allWidgets: () => getWidgets(),
    allCategories: () => getCategories(),
    allOrders: () => getOrders(),
    getOrder: (parent, { orderNumber }) => getOrderByOrderNumber(orderNumber)
  },
  Widget: {
    category(source) {
      if (!source.category) {
        return;
      }

      return getCategoryById(source.category.id);
    }
  },
  Order: {
    widgets(source) {
      if (!source.widgets || !source.widgets.length) {
        return;
      }

      return Promise.all(
        source.widgets.map(async ({ id, quantity, amount }) => {
          return {
            ...(await getWidgetById(id)),
            quantity,
            amount
          };
        })
      );
    }
  },
  Mutation: {
    ...widgetMutations
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'A valid date value',
    serialize: value => value.substring(0, 10),
    parseValue: value => new Date(value).toISOString(),
    parseLiteral: literal => new Date(literal.value).toISOString()
  })
};

const typeDefs = importSchema('./schema/schema.graphql');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false }
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const key = req.headers.authorization;

    if (!key && key !== process.env.publicKey) {
      throw new Error('Public Key is not valid');
    }
  }
});

server
  .listen()
  .then(({ url }) => `GraphQL server listening on ${url}`)
  .then(console.log)
  .catch(console.error);
