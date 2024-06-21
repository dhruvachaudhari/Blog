import { db } from "../index.js";

export const getposts = (req, res) => {
    // const search = req.query.search;
    // const q = search ? "SELECT * FROM POST WHERE title LIKE ?" : "SELECT * FROM POST";


    const q = "SELECT * FROM POST"
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error fetching posts:", err);
            return res.status(500).json({ error: "Error fetching posts" });
        }
        console.log("Fetched posts:", data)
        return res.status(200).json(data);

    });
}

export const getpost = (req, res) => {
    const searchTerm = req.query.term;
    if (!searchTerm) {
        return res.status(400)
            .json(
                {
                    error: 'Search term is required'
                }
            );
    }

    const query = `
    SELECT * FROM POST P , USER U 
    WHERE p.title LIKE ? OR U.username `;


    const searchValue = `%${searchTerm}%`;

    db.query(query, [searchValue],
        (err, results) => {
            if (err) {
                console
                    .error('Error executing search query:', err);
                return res.status(500)
                    .json(
                        {
                            error: 'Internal server error'
                        });
            }

            res.json(results);
        });
}

export const singlepost = (req, res) => {


    const q2 = `
    SELECT p.idpost, u.username, p.title, p.desc, p.img as postimg, u.img AS userImg
    FROM user u
    JOIN post p ON u.iduser = p.uid
    WHERE p.idpost = ?;
  ` ;
    // console.log(idpost+ " this is idpost");
    db.query(q2, [req.params.idpost], (err, data) => {
        // console.log(idpost+ " this is idpost");
        if (err) return res.status(500).json(err);



        return res.status(200).json(data[0]);
    });
}

export const addpost = (req, res) => {

    const uid = 1

    const q3 =
        "INSERT INTO post(`title`, `cat`, `desc`, `img`, `date`,`uid`) VALUES (?)";

    const values = [
        req.body.title,
        req.body.cat,
        req.body.desc,
        req.body.img,
        req.body.date,
        uid,
    ];

    db.query(q3, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
    });

}

export const deletepost = (req, res) => {
    const uid = 1
    const postId = req.params.id;
    const q = "DELETE FROM post WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, uid], (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");

        return res.json("Post has been deleted!");
    });
}

export const updatepost = (req, res) => {
    const uid = 1
    const postId = req.params.id;
    const q =
        "UPDATE post SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, uid], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
    });
}

export const getcomment = (req, res) => {

    const postId = req.params.idpost;
    db.query('SELECT * FROM comments WHERE post_id = ?', [postId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
}

export const addcomment = (req, res) => {

    const { content } = req.body;
    const post_id = req.params.idpost
    const user_id = 1
    db.query('INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)', [user_id, post_id, content], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send({ id: results.insertId });
    });

}

export const editcomment = (req, res) => {

    const { id } = req.params;
    const { content } = req.body;
    db.query('UPDATE comments SET content = ? WHERE id = ?', [content, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });

}

export const deletecomment = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM comments WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(results);
    });
}

export const likecomment = (req, res) => {

    const { id } = req.params;
    const { user_id } = req.body;
    db.query('SELECT likes, number_of_likes FROM comments WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        let likes = JSON.parse(results[0].likes);
        if (!likes.includes(user_id)) {
            likes.push(user_id);
            db.query('UPDATE comments SET likes = ?, number_of_likes = number_of_likes + 1 WHERE id = ?', [JSON.stringify(likes), id], (err, results) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send(results);
            });
        } else {
            res.send({ message: 'User already liked this comment' });
        }
    });

}


