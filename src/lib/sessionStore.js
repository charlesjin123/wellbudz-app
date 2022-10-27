import { writable } from 'svelte/store'

// export class Message {
//     constructor(createdAt, message, sender, receiver) {
//       this.createdAt = createdAt;
//       this.message = message;
//       this.sender = sender;
//       this.receiver = receiver;
//     }
// }

export const user = writable(false);

// export const messages = writable<Message[]>([]) // the [] is default empty list
export const chatMessages = writable([]);

export const partner = writable(false);

export const userProfile = writable([]);
export const partnerProfile = writable([]);

export const streakDays = writable([]);
export const goals = writable([]);
export const buddyGoals = writable([]);
export const month = writable(false);
export const year = writable(false);
export const blankdays = writable([]);
export const no_of_days = writable([]);

export const showReportModalHomePage = writable(false);

export const showToast = writable(false);
export const toastMessage = writable(false);
export const toastColor = writable(false);

// export const resetStores = () => {
//     user.set(false);

//     chatMessages.set([]);

//     partner.set(false);

//     userProfile.set([]);
//     partnerProfile.set([]);

//     streakDays.set([]);
//     goals.set([]);
//     buddyGoals.set([]);
//     month.set(false);
//     year.set(false);
//     blankdays.set([]);
//     no_of_days.set([]);

//     console.log("reset stores");
// }

// export const store = writable < Store > (defaultStore)


// supabase.auth.onAuthStateChange((event, session) => {
//     if (event == 'SIGNED_IN') {
//         store.update((oldStore) => {
//             return {
//                 ...oldStore,
//                 user: session.user
//             }
//         })
//     } else if (event == 'SIGNED_OUT') {
//         store.set(defaultStore)
//     }
// })

// export default {
//     msg: {
//         send: async ({ username, text }: { username: string; text: string }) =>
//             await supabase.from('messages').insert([{ is_authenticated: true, username, text }]),

//         getAll: async (): Promise<Msg[]> => {
//             const res = await supabase.from('messages').select().order('timestamp', {
//                 ascending: true
//             })
//             return res.data
//         }
//     }
// }