const userController = {};

userController.getAll = (req, res) => {
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username createdAt -_id'
    }).populate({
        path: '_comments',
        select: 'text createdAt _creator -_id',
        match: { 'isDeleted': false }
    }) .then((posts) => {
        return res.status(200).json({
            success: true, 
            data: posts
        })
    }).catch((err) => {
        return res.status(500).json({
            message: err
        })
    })
}