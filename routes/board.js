// const { testCtrl } = require('../controllers/boardController');
const router = require('express').Router()
const db_config = require('../dbConfig')
const mysql = require('mysql')
const pool = new mysql.createPool(db_config)

router.post('/post', async (req, res) => {
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

router.get('/list', async (req, res) => {
  pool.query(
    `
    select TITLE, WRITER, CONTENTS, REG_DATE from TB_BOARD
    `,
    (error, rows) => {
      if (error) throw error
      res.send(rows)
    }
  )
})

module.exports = router
