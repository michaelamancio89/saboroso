var conn = require('./db');

module.exports = {

    render(req, res, error,success){

        res.render('reservations', {

            title: 'Reservas - Restaurante Saboroso!',
            background: 'images/img_bg_2.jpg',
            h1:'Reserve uma Mesa!',
            body:req.body,
            error,
            success
        
          });

    },
    save(fields){

        return new Promise((resolve, reject) => {

            conn.query(`INSERT INTO tb_contacts (name, email, message)
                    VALUES(?, ?, ?, ?, ?)
            `, [
                fields.name,
                fields.email,
                fields.message

            ], (err, results) => {

                if (err) {

                    reject(err);

                } else {

                    resolve(results);
                }
            });

        });
    },
    getContacts(){

        return new Promise((resolve, reject) => {

            conn.query(`SELECT * FROM tb_contacts ORDER BY register DESC`, (err, results) => {

                if (err) {
            
                  reject(err);
            
                }
            
                resolve(results);
            
              });

        });
    },

    delete(id){

      return new Promise((resolve, reject) => {

        conn.query(`

            DELETE FROM tb_contacts WHERE id = ?
        `, [
          id
        ], (err, results) => {

          if (err) {
            reject(err);
          } else {
             resolve(results);
          }
        });

      });

    }
};
