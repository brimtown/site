module.exports = {
  siteMetadata: {
    title: 'Tim Brown',
    name: 'Tim Brown',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-68165507-1',
      },
    },
  ],
};
