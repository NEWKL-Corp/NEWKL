const router = require('express').Router();
const db_config = require('../dbConfig');
const mysql = require('mysql');
const pool = new mysql.createPool(db_config);

router.post('/', async (req, res) => {
    const { board_id } = req.body;
    pool.query(
        `
    select * from TB_COMMENT where BOARD_ID = ${board_id} and exists(select * from TB_COMMENT where BOARD_ID = ${board_id})
        `,
        (error, rows) => {
            if (error) throw error;
            if (rows.length) {
                return res.send({ success: true, rows });
            } else {
                return res.send({ success: false });
            }
        }
    );
});

router.post('/post', async (req, res) => {
    const { board_id, comment_id, contents, link } = req.body;

    if (comment_id) {
        pool.query(
            `
            update TB_COMMENT set CONTENTS='${contents}' , LINK='${link}' where COMMENT_ID = ${comment_id}
            `,
            (error, rows) => {
                if (error) throw error;
                else return res.send({ success: true });
            }
        );
    } else {
        pool.query(
            `
            insert into TB_COMMENT (CONTENTS,REG_DATE,BOARD_ID) values ('${contents}',now(), ${board_id})
            `,
            (error, rows) => {
                if (error) throw error;
                else return res.send({ success: true });
            }
        );
    }
});

router.post('/delete', async (req, res) => {
    const { comment_id } = req.body;

    pool.query(
        `
        delete from TB_COMMENT where COMMENT_ID = ${comment_id}
        `,
        (error, rows) => {
            if (error) throw error;
            else
                return res.send({
                    success: true,
                    msg: '답변이 삭제되었습니다.',
                });
        }
    );
});
module.exports = router;
