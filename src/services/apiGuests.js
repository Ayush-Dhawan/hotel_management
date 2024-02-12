import supabase from "./supabase";

export async function deleteGuest(email){
console.log("gues ka email: ", email)
const { error } = await supabase
.from('guests')
.delete()
.eq('email', email)

if(error){
    console.log(error.message)
}

}

// export async function getGuestIdByRequestId(requestId) {
//     const { data, error } = await supabase
//       .from('guests')
//       .select('guestId')
//       .eq('id', requestId)
//       .single();
  
//     if (error) {
//       console.error(error);
//       throw new Error("GuestId could not be retrieved");
//     }
  
//     console.log("guestId:", data.guestId);
//     return data ? data.guestId : null;
//   }
  
  