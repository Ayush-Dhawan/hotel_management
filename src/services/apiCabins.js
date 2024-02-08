import supabase, { supabaseUrl } from "./supabase"

export async function getCabins(){
    
let { data, error } = await supabase
.from('cabins')
.select('*')

if(error){
    console.log("error loading cabins")
    throw new Error("error loading cabins")
}
return data;
}

export async function deleteCabins(id){
    const { data, error } = await supabase
  .from('cabins')
  .delete()
  .eq('id', id)

  if(error){
    console.log(error);
    throw new Error("cabin could not be deleted")
  }
  return data;
}

export async function createEditCabins(newCabin, id){

  // https://jaaramkfipybtkkixsmc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${newCabin.image.name}`.replaceAll("/", "")
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  //1. create cabin  
let query = supabase.from('cabins')

if(!id)
 query =  query
.insert([{...newCabin, image: imagePath}])
.select()

if(id){
 query =  query.update({...newCabin, image: imagePath})
  .eq("id", id)
  .select()
}

const {data, error} = await query;

if(error){
  console.log(error);
  throw new Error("Cabin could not be created")
}

// 2. upload image
if(hasImagePath) return data;
const {error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image)

  // 3. delete the cabin i case of storage error
  // if(storageError){
  //   await supabase
  // .from('cabins')
  // .delete()
  // .eq('id', data.id)
  //   console.log(storageError);
  //   throw new Error("Cabin image could not be uploaded")
  // }

}