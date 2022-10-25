const router = require('express').Router()
const db_config = require('../dbConfig')
const mysql = require('mysql')
const pool = new mysql.createPool(db_config)

router.post('/', async (req, res) => {
  const { board_id } = req.body
  pool.query(
    `
    select * from TB_COMMENT where BOARD_ID = ${board_id}
        `,
    (error, rows) => {
      if (error) throw error
      else return res.send({ success: true, rows })
    }
  )
})

router.post('/post', async (req, res) => {
  const { board_id, comment } = req.body
  console.log(board_id, comment)
  pool.query(
    `
    insert into TB_COMMENT (CONTENTS,REG_DATE,BOARD_ID) values ('${comment}',now(), ${board_id})
    `,
    (error, rows) => {
      if (error) throw error
      else return res.send({ success: true, rows })
    }
  )
})
module.exports = router
