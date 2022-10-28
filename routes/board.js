const router = require('express').Router();
const db_config = require('../dbConfig');
const mysql = require('mysql2');
const pool = new mysql.createPool(db_config);
const promisePool = pool.promise();

router.post('/totalCount', async (req, res) => {
    const execQuery = `
    select count(BOARD_ID) as totalCount from TB_BOARD
    `;
    const execResult = await promisePool.query(execQuery);
    const totalCount = execResult[0][0].totalCount;
    return res.status(200).json({ success: true, totalCount });
});

router.post('/', async (req, res) => {
    const { totalCount, currentPage, searchText, searchType } = req.body;
    let pageSize = 20;
    let queryText = '';
    if (searchType === 1) {
        queryText = ``;
    }

    try {
        //페이지 네이션 필요
        // const pagingQuery = `
        // select
        //     list.*
        // from (
        //     select
        //         ROW_NUMBER() over(ORDER by BOARD_ID asc) as row_num, tb.*, tc.COMMENT_ID
        //     from
        //         TB_BOARD tb left join TB_COMMENT tc on tb.BOARD_ID=tc.BOARD_ID
        //     ) as list
        // WHERE
        //     row_num BETWEEN
        //     ${totalCount - currentPage * pageSize + 1}
        //     and
        //     ${totalCount - (currentPage - 1) * pageSize}
        //     order by row_num desc
        // `;
        const pagingQuery = `
        select 
        ROW_NUMBER() over(ORDER by BOARD_ID asc) as row_num, tb.*, tc.COMMENT_ID
        from TB_BOARD tb left join TB_COMMENT tc on tb.BOARD_ID=tc.BOARD_ID
`;
        const pagingResult = await promisePool.query(pagingQuery);
        const boardList = pagingResult[0];
        return res.status(200).json({ success: true, result: boardList });
    } catch (error) {
        console.log(error, '\n', req.route.path);
        return res.status(400).json({ success: false, error });
    }
});

router.post('/check', async (req, res) => {
    const { board_id, pswd } = req.body;
    const masterKey = process.env.MASTERKEY;
    try {
        if (pswd === masterKey) {
            const execQuery = ` select * from TB_BOARD where BOARD_ID = ${board_id}`;
            await promisePool.query(execQuery);

            return res.status(200).json({ success: true, masterKey: true });
        } else {
            const execQuery = ` select * from TB_BOARD where BOARD_ID = ${board_id} and PSWD = '${pswd}'`;
            const execResult = await promisePool.query(execQuery);
            const article = execResult[0][0];
            if (article) {
                return res
                    .status(200)
                    .json({ success: true, masterKey: false });
            } else {
                return res.status(200).json({
                    success: false,
                    msg: '비밀번호가 일치하지 않습니다.',
                });
            }
        }
    } catch (error) {
        console.log(error, '\n', req.route.path);
        return res.status(400).json({ success: false, error });
    }
});

router.post('/article', async (req, res) => {
    const { board_id } = req.body;

    try {
        const execQuery = `select * from TB_BOARD where BOARD_ID = ${board_id}`;
        const execResult = await promisePool.query(execQuery);
        const article = execResult[0][0];
        return res.status(200).json({ success: true, article });
    } catch (error) {
        console.log(error, '\n', req.route.path);
        return res.status(400).json({ success: false, error });
    }
});

router.post('/post', async (req, res) => {
    const { board_id, title, name, pswd, contents, email, phone_number, link } =
        req.body;
    try {
        if (board_id) {
            const execQuery = `
            update TB_BOARD set TITLE =  '${title}', WRITER = '${name}', PSWD =  '${pswd}', CONTENTS = '${contents}', EMAIL = '${email}', PHONE_NUMBER = '${phone_number}', LINK='${link}' where BOARD_ID = ${board_id}
            `;
            await promisePool.query(execQuery);

            return res
                .status(200)
                .json({ success: true, msg: '게시글이 수정되었습니다.' });
        } else {
            const execQuery = `
            insert into TB_BOARD (TITLE, WRITER, PSWD ,CONTENTS, EMAIL, PHONE_NUMBER, REG_DATE,LINK) values ('${title}','${name}', '${pswd}','${contents}', '${email}','${phone_number}' , now(),'${link}' )
            `;
            await promisePool.query(execQuery);

            return res
                .status(200)
                .json({ success: true, msg: '게시글이 작성되었습니다.' });
        }
    } catch (error) {
        console.log(error, '\n', req.route.path);
        return res.status(400).json({ success: false, error });
    }
});

router.post('/delete', async (req, res) => {
    const { board_id } = req.body;
    try {
        const execQuery = `delete from TB_BOARD where BOARD_ID = ${board_id}`;
        await promisePool.query(execQuery);
        return res
            .status(200)
            .json({ success: true, msg: '게시글이 삭제되었습니다.' });
    } catch (error) {
        console.log(error, '\n', req.route.path);
        return res.status(400).json({ success: false, error });
    }
});
module.exports = router;
