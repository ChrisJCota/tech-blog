const User = require('./User');
const Comments = require('./Comments');
const Blog = require('./Blog')

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.hasMany(Comments);
Comments.belongsTo(Blog);

User.hasMany(Comments);
Comments.belongsTo(User);

module.exports = { User, Blog, Comments };
