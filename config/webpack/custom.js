// module.exports = {
//     module: {
//       rules: [
//         {
//           test: require.resolve("jquery"),
//           loader: "expose-loader",
//           options: {
//             exposes: {
//               globalName: "$",
//               override: true,
//             }
//           },
//         },
//        ],
//     },
//   };


module.exports = {
  module: {
    rules: [
      {
        test: /\.erb$/,
        enforce: 'pre',
        loader: "rails-erb-loader",
      }
    ],
  },
};