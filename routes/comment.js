const router = require('express').Router();
const db_config = require('../dbConfig');
const mysql = require('mysql2');
const pool = new mysql.createPool(db_config);
const promisePool = pool.promise();

router.post('/', async (req, res) => {
    const { board_id } = req.body;
    try {
        const execQuery = `
        select * from TB_COMMENT where BOARD_ID = ${board_id} and exists(select * from TB_COMMENT where BOARD_ID = ${board_id})
        `;
        const execResult = await promisePool.query(execQuery);
        const comment = execResult[0];
        if (comment.length) {
            return res.status(200).json({ success: true, comment });
        } else {
            return res.status(200).json({ success: false });
        }
    } catch (error) {
        console.log(error, '\n', req.route.path);
        return res.status(400).json({ success: false, error });
    }
});

router.post('/post', async (req, res) => {
    const { board_id, comment_id, contents, link } = req.body;
    try {
        if (comment_id) {
            const execQuery = `
            update TB_COMMENT set CONTENTS='${contents}' , LINK='${link}' where COMMENT_ID = ${comment_id}
            `;
            await promisePool.query(execQuery);
            return res.status(200).json({ success: true });
        } else {
            const execQuery = `
            insert into TB_COMMENT (CONTENTS,REG_DATE,BOARD_ID) values ('${contents}',now(), ${board_id})
            `;
            await promisePool.query(execQuery);
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.log(error, '\n', req.route.path);
        return res.status(400).json({ success: false, error });
    }
});

router.post('/delete', async (req, res) => {
    const { comment_id } = req.body;
    try {
        const execQuery = `
        delete from TB_COMMENT where COMMENT_ID = ${comment_id}
        `;
        await promisePool.query(execQuery);
        return res
            .status(200)
            .json({ success: true, msg: '답변이 삭제되었습니다.' });
    } catch (error) {
        console.log(error, '\n', req.route.path);
        return res.status(400).json({ success: false, error });
    }
});
module.exports = router;
