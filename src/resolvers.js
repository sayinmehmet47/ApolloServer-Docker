const resolvers = {
  Query: {
    // get all tracks, will be used to populate the homepage grid of our web client
    tracksForHome: (_, __, { dataSources }) => {
      return dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by id
    track: (parent, { id }, { dataSources }, info) => {
      return dataSources.trackAPI.getTrack(id);
    },
    author: (__, { authorId }, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    module: (parent, { moduleId }, { dataSources }) => {
      return dataSources.trackAPI.getModule(moduleId);
    },
  },
  Track: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
    // get all modules for a single track
    modules: ({ id }, _, { dataSources }) => {
      return dataSources.trackAPI.getTrackModules(id);
    },
  },

  Mutation: {
    incrementNumberOfViews: async (_, { id }, { dataSources }) => {
      try {
        const track = await dataSources.trackAPI.incrementNumberOfViews(id);

        return {
          code: 200,
          success: true,
          message: 'Number of views incremented',
          track: track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },
};

module.exports = resolvers;
