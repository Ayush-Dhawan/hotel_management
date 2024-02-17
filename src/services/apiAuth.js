import supabase from "./supabase"


export async function signUp({fullName, email, password}){
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar : "",
      }
    },
  })

  if(error) throw new Error(error.message)

  console.log(data);
  return data;
}

export async function login({email, password}){
    
let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if(error) throw new Error(error.message)

  console.log(data);
  return data;
}


export async function getCurrentUser(){
  const {data} = await supabase.auth.getSession();

  if(!data.session) return null;

  const {data: userData, error} = await supabase.auth.getUser();
  if(error) throw new Error(error.message);
  return userData.user;
}

export async function userLogout(){
  const {error} = await supabase.auth.signOut();
  if(error){ 
    console.log("error logging out")
    throw new Error(error.message);
  }
}

export async function updateCurrUser({ fullName, password, avatar}){

  let updateData;
  if(password) updateData = {password}
  if(fullName) updateData = {data: {fullName}}
  
  const { data, error } = await supabase.auth.updateUser(updateData)
  if(!avatar) return data;
  if(error) throw new Error(error.message);

  //uploading avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const {error: storageError} = await supabase.storage.from("avatars").upload(fileName, avatar)

  if(storageError) throw new Error(storageError.message);

  //update avatar in user

  //https://jaaramkfipybtkkixsmc.supabase.co/storage/v1/object/public/avatars/imageName.jpg?t=2024-02-17T17%3A23%3A23.215Z
  const {data: updatedUser, error: error2} = await supabase.auth.updateUser({
    data: {
      avatar: `https://jaaramkfipybtkkixsmc.supabase.co/storage/v1/object/public/avatars/${fileName}`
    }
  })

  if(error2) throw new Error(error2.message);
  return updatedUser;
}