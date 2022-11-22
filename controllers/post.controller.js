const prisma = require('../prisma/index');

//create a new post

exports.createPost = async (req, res) => {
  try {
    const { slug, body, title, authorId } = req.body;

    //validation

    if (!authorId || !slug || !title || !body) {
      return res.status(400).json({
        error: 'author, slug, titel und body müssen vollständig sein',
      });
    }

    const result = await prisma.post.create({
      data: {
        slug: slug,
        body: body,
        title: title,
        author: { connect: { id: authorId } },
      },
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;

  const { title, body } = req.body;

  try {
    const result = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        body: body,
      },
    });

    res.status(201).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ error: err, msg: `post mit der id:${id} existiert nicht` });
  }
};

// delete a post

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      error: err,
      msg: `post mit der id:${id} konnte nicht gelöscht werden`,
    });
  }
};

// get all posts
exports.getPosts = async (req, res) => {
  try {
    const result = await prisma.post.findMany();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err, msg: 'keine Posts in der DB' });
  }
};
