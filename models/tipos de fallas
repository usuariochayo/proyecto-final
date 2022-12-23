const modelotipo_fallas = {    
queryGettipo_fallas: "SELECT * FROM tipos_de_fallas",
queryGettipo_fallasById: `SELECT * FROM tipos_de_fallas WHERE ID = ?`,
queryDeletedtipo_fallas: `UPDATE tipos_de_fallas SET Prioridad_de_falla = 'N'WHERE ID ?`,
querytipo_fallasexist: `SELECT Nombre_falla FROM tipos_de_falla WHERE Nombre_de_falla = '?'`,
queryaddtipo_fallas: `INSERT INTO tipos_de_falla (
       ID, 
       nombre_de_falla,
       descripcion_de_falla,
       priorida_de_falla
    ) VALUES (
       '?',
       '?',
       '?',
       '?'
       
    )`,
    querygettipo_fallasinfo: `SELECT ID, nombre_de_falla, descripcion_de_falla, prioridad_de_falla  
    FROM tipos_de_fallas 
    WHERE ticket = '?'`,

   queryupdatebytipo_fallas:`UPDATE personal SET (
       ID,= '?',
       nombre_de_falla,='?',
       descripcion_de_falla,=? ,
       prioridad_de_falla,='?',
       WHERE tipo_de_fallas = '?'`,

   }

module.exports = modelotipo_fallas


