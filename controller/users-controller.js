import User from '../model/user.js'

export async function getUsers  (req, res) {
    try{
      const users = await User.findAll();
      res.status(200).json(users);
    } catch(err){
      res.status(400).json("Erro ao criar usuário");
    }
      
  }


  export async function createUsers (req, res) {
    try{
      const newUsers = await User.create(req.body);
      res.status(201).json(newUsers);
    } catch(err){
      console.log(err)
      res.status(400).json("Erro ao criar ao usuário");
    }
  
  }


  export async function findUsers(req, res) {
    const id = req.params.id;
    const users = await User.findByPk(id);
    if(!users){
        return res.status(404).json("Usuário não encontrado");
    }
    res.status(200).json(users);
  }

  export async function deleteUsers(req, res){
    const id = req.params.id;
    const users = await User.findByPk(id);
    if(!users){
        return res.status(404).json(" Usuário não encontrado");
    }
    await users.destroy();
    res.status(200).json(User);
  }

  export async function updateUsers(req, res){
    const id = req.params.id;
    const users = await User.findByPk(id);
    if(!users){
        return res.status(404).json("Usuário não encontrado");
    }
    try{
        await users.set(req.body);
        await users.save();
        res.status(200).json(users);
    } catch(err){
        console.log(err);
        res.status(400).json("Falha ao atualizar o usuário.");
    }
  }

