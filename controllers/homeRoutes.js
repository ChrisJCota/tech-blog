const router = require('express').Router();
const { User, Blog, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all Blogs and JOIN with user data
      const blogData = await Blog.findAll({
        include: [
          {
            model: User,
            
          },
        ],
      });
  
      // Serialize data so the template can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        blogs, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });

  router.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }
    User.findByPk(req.session.user.id, {
        include: [Blog, Comments]
    }).then(userData => {
        const blogData = userData.get({ plain: true })
        blogData.loggedIn = req.session.user ? true : false
        res.render("dashboard", blogData)
    })
})

router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
        
            User, { model: Comment, include: [User] }
          
        ],
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;