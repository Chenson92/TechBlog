const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
router.get('/', async (req, res) => {
  try {
     
      const postData = await Post.findAll({
          attributes: ['id', 'title', 'content', 'created_at'],
          order: [['created_at', 'DESC']],
          include: [
              {
                  model: User,
                  attributes: ['name'],
              },
              {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['name'],
                  },
              },
          ],
      });

      res.json(postData.reverse());
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
      const postData = await Post.findOne({
          where: { id: req.params.id },
          attributes: ['id', 'content', 'title', 'created_at'],
          include: [
              {
                  model: User,
                  attributes: ['name'],
              },
              {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['name'],
                  },
              },
          ],
      });

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }

      res.json(postData);
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.update(
          {
              title: req.body.title,
              content: req.body.content
          },
          {
              where: {
                  id: req.params.id
              }
          }
      );

      if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }

      res.json({ message: 'Post updated successfully' });
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
