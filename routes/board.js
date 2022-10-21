// const { testCtrl } = require('../controllers/boardController');
const router = require('express').Router()
const db_config = require('../dbConfig')
const mysql = require('mysql')
const pool = new mysql.createPool(db_config)

router.post('/board/post', async (req, res) => {
  const { title, name, pswd, contents } = req.body
  pool.query(
    `
    insert into TB_BOARD (TITLE, WRITER,PSWD ,CONTENTS, REG_DATE) values ('${title}','${name}', ${pswd},'${contents}',now() )
    `,
    (error, rows) => {
      if (error) throw error
      console.log(rows)
    }
  )
})

router.post('/board/:boardId', async (req, res) => {
  const { boardId } = req.params
  const { pswd } = req.body
  const masterKey = process.env.MASTERKEY
  if (psed === masterKey) {
    pool.query(
      `
      select * from TB_BOARD where BOARD_ID = ${boardId}
      `,
      (error, rows) => {
        if (error) throw error
        console.log(rows)
      }
    )
  } else {
    pool.query(
      `
      select * from TB_BOARD where BOARD_ID = ${boardId} and PASSWORD = ${pswd}
      `,
      (error, rows) => {
        if (error) throw error
        console.log(rows)
      }
    )
  }
})

router.get('/', async (req, res) => {
  pool.query(
    `
    select tb.BOARD_ID, tb.TITLE, tb.WRITER , tb.REG_DATE, tc.COMMENT_ID from TB_BOARD as tb , TB_COMMENT as tc WHERE tc.BOARD_ID = tb.BOARD_ID  
    `,
    (error, rows) => {
      if (error) throw error
      res.send(rows)
    }
  )
})

module.exports = router
