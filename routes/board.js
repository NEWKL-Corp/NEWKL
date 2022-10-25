// const { testCtrl } = require('../controllers/boardController');
const router = require('express').Router()
const db_config = require('../dbConfig')
const mysql = require('mysql')
const pool = new mysql.createPool(db_config)

router.post('/', async (req, res) => {
  pool.query(
    `
    select 
      tb.*,
      tc.COMMENT_ID 
    from 
      TB_BOARD as tb 
      left join 
      TB_COMMENT as tc 
      on tb.BOARD_ID = tc.BOARD_ID 
    `,
    (error, rows) => {
      if (error) throw error
      else return res.send({ success: true, rows })
    }
  )
})

router.post('/check', async (req, res) => {
  const { board_id, pswd } = req.body
  const masterKey = process.env.MASTERKEY

  if (pswd === masterKey) {
    pool.query(
      `
      select * from TB_BOARD where BOARD_ID = ${board_id}
      `,
      (error, rows) => {
        if (error) throw error
        else return res.send({ success: true })
      }
    )
  } else {
    pool.query(
      `
      select * from TB_BOARD where BOARD_ID = ${board_id} and PSWD = '${pswd}'
      `,

      (error, rows) => {
        if (error) throw error
        else {
          if (rows.length) {
            return res.send({ success: true })
          } else {
            return res.send({
              success: false,
              msg: '비밀번호가 일치하지 않습니다.',
            })
          }
        }
      }
    )
  }
})

router.post('/article', async (req, res) => {
  const { board_id } = req.body
  pool.query(
    `
      select * from TB_BOARD where BOARD_ID = ${board_id}
      `,

    (error, rows) => {
      if (error) throw error
      else {
        if (rows.length) {
          return res.send({ success: true, rows })
        } else {
          return res.send({
            success: false,
            msg: '잠시 후 다시 시도해주세요.',
          })
        }
      }
    }
  )
})

router.post('/post', async (req, res) => {
  const { board_id, title, name, pswd, contents, email, phone_number } =
    req.body
  if (board_id) {
    pool.query(
      `
      update TB_BOARD set TITLE =  '${title}', WRITER = '${name}', PSWD =  '${pswd}', CONTENTS = '${contents}', EMAIL = '${email}', PHONE_NUMBER = '${phone_number}' where BOARD_ID = ${board_id}
      `,
      (error, rows) => {
        if (error) throw error
        else return res.send({ success: true, msg: '게시글이 수정되었습니다.' })
      }
    )
  } else {
    pool.query(
      `
      insert into TB_BOARD (TITLE, WRITER, PSWD ,CONTENTS, EMAIL, PHONE_NUMBER, REG_DATE) values ('${title}','${name}', '${pswd}','${contents}', '${email}','${phone_number}' , now() )
      `,
      (error, rows) => {
        if (error) throw error
        else return res.send({ success: true, msg: '게시글이 작성되었습니다.' })
      }
    )
  }
})
module.exports = router
