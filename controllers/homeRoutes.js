const router = require('express').Router();
const { Post,Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
   
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    
    const posts = postData.map((p) => post.get({ plain: true }));

    
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {model:Comment}
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup',  (req, res)=> {
  try {

    res.render('login');
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
