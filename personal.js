const { request, response } = require("express");
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection");
const {modelpersonal, updatepersonal} = require("../models/personal");
const getpersonal = async (req = request, res = response) => {
 let conn;

 try {
    conn = await pool.getConnection()

    const personals = await conn.query(modelpersonal.queryGetpersonal, (error) => {throw new Error(error)})

    if (!personals) {
        res.status(404).json({msg: "no se encontraron registros"})
        return
    }
    res.json({personals})
 } catch (error) {
    console.log(error)
    res.status(500).json({error})
 } finally{
    if (conn) {
        conn.end()
    }
 }
}
const getpersonalByID = async (req = request, res = response) => {
   const {id} = req.params
   let conn;
  
   try {
      conn = await pool.getConnection()
  
      const [personal] = await conn.query(modelpersonal.queryGetpersonalById,[id], (error) => {throw new Error(error)})
  
      if (!personal) {
          res.status(404).json({msg: `no se encontro registro con el ID ${id}`})
          return
      }
      res.json({personal})
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
  }
  const deletepersonalByID = async (req = request, res = response) => {
   const {id} = req.params
   let conn;
  
   try {
      conn = await pool.getConnection()
      const {affectedRows} = await conn.query( modelpersonal.queryDeletedpersonal,[id], (error) => {throw new Error(error)})
  
      if (affectedRows=== 0) {
          res.status(404).json({msg: `No se pudo eliminar el personal con el registro con el ID ${id}`})
          return
      }
      res.json({msg: `El usario con ID ${id} se elimino correctamente`})
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
  }
  const addpersonal = async (req = request, res = response) => {
   const {
      Nombre,
      Apellidos,
      Usuario,
      departamento,
      Contrasena,
      Activo
   } = req.body
   if(      
   !Nombre||
   !Apellidos||
   !Usuario||
   !Contrasena||
   !departamento||
   !Activo
   ){
      res.status(400).json({msg: "Falta informacion del personal"})
      return
   }
   let conn;
  
   try {
      conn = await pool.getConnection()

      const personal = await conn.query(modelpersonal.querypersonalexist,[personal])

      if(!personal){
         res.status(403).json({msg: `El personal ${personal} ya se encuentra registrado`})
         return
      }

      const salt = bcryptjs.genSaltSync()
      const ContrasenaCifrada = bcryptjs.hashSync(Contrasena, salt)

      const affectedRows = await conn.query(modelpersonal.queryaddpersonal[
         Nombre,
         Apellidos,
         Usuario,
         departamento,
         ContrasenaCifrada,
         Activo
      
      ] , (error) => {throw new Error(error)})
      

      if (affectedRows === 0) {
         res.status(404).json({msg: `no se pudo agregar el registro del personal ${personal}`})
         return
   }
      res.json({msg: `el personal ${personal} se agrego correctamente :D`})
      return
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
  }
  const updatepersonalBypersonal = async (req = request, res = response) => {
   const {
      Nombre,
      Apellidos,
      Usuario,
      departamento,
      Contrasena,
      Activo
   } = req.body
   console.log({personal,
      Nombre,
      Apellidos,
      Usuario,
      departamento,
      Contrasena,
      Activo})
   if(      
   !Usuario||
   !Nombre||
   !Apellidos||
   !departamento||
   !Contrasena||
   !Activo   
   )
   {
      res.status(400).json({msg: "Falta informacion del personal"})
      return
   }
   let conn;
  
   try {
      conn = await pool.getConnection()

      const personal = await conn.query(modelopersonals.querygetpersonalinfo, [personal])

      if(personal){
         res.status(403).json({msg: `El personal ${personal} no se encuentra registrado`})
      }

      const affectedRows = await conn.query(updatepersonal (Nombre,Apellidos,Usuario,Contrasena,departamento,Activo), (error) => {throw new Error(error)})
      

      if (affectedRows === 0) {
         res.status(404).json({msg: `no se pudo agregar el registro del personal ${personal}`})
         return
   }
      res.json({msg: `el personal ${personal} se actualizo correctamente :D`})
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
  }
  const signIn = async (req = request, res = response) => {
   const {
      Usuario,
      Contrasena,
      } = req.body
   if(      
   !Usuario||
   !Contrasena
   ){
      res.status(400).json({msg: "Falta informacion del personal"})
      return
   }
   let conn;
  
   try {
      conn = await pool.getConnection()

      const [personal] = await conn.query(modelopersonals.querysignIn[personal])

      if(!Usuario || Usuario.Activo === 'N'){
         let code = !Usuario ? 1 : 2;
         res.status(403).json({msg: `El personal o la contraseña son incorrectas.`, errorCode: code})
         return
      }

      const accesoValido = bcryptjs.compareSync(Contrasena, personal.Contrasena)

      if (!accesoValido) {
         res.status(403).json({msg: `El personal o la contraseña son incorrectas.`, errorCode: 3})
         return
      }

      res.json({msg: `el personal ${personal} ha iniciado sesion satisfactoriamente`})
      return
   } catch (error) {
      console.log(error)
      res.status(500).json({error})
   } finally{
      if (conn) {
          conn.end()
      }
   }
  }
  const newPassword = async (req=request,res=response)=>{
   const {
       personal,
       AContrasena,
       NContrasena
   }=req.body

   if(
       !personal||
       !AContrasena||
       !NContrasena
   ){
       res.status(400).json({msg:"Faltan datos."})
       return
   }

   let conn;

   try{
       conn = await pool.getConnection()
       const [personal]=await conn.query(`SELECT personal, Contrasena, Activo FROM personals WHERE personal = '${personal}'`)

       if(!personal || personal.Activo == 'N'){
           let code = !personal ? 1: 2;
           res.status(403).json({msg:`El personal o la contraseña son incorrectos`,errorCode:code})
           return
       }

       const datosValidos = bcryptjs.compareSync(AContrasena,personal.Contrasena)

       if(!datosValidos){
           res.status(403).json({msg:`El personal o la contraseña son incorrectos`,errorCode:"3"})
           return
       }

       const salt = bcryptjs.genSaltSync()
       const contrasenaCifrada = bcryptjs.hashSync(NContrasena,salt) 

       const {affectedRows} = await conn.query(`
           UPDATE personals SET
               Contrasena='${contrasenaCifrada}'
           WHERE personal= '${personal}'
           `,(error)=>{throw new error})
       if(affectedRows===0){
           res.status(404).json({msg:`No se pudo actualizar la contraseña de ${personal}`})
           return
       }
       res.json({msg:`La contraseña de ${personal} se actualizo correctamente`})
   }catch(error){
       console.log(error)
       res.status(500).json({error})
   }finally{
       if(conn){
           conn.end()
       }
   }
}

module.exports = {getpersonal,getpersonalByID,updatepersonalBypersonal,deletepersonalByID, addpersonal,signIn,newPassword}