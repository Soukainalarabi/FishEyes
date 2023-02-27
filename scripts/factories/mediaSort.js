// export const sortType = {
//     date: "DATE",
//     title: "TITLE",
//     like: "LIKE"
// }

// export function mediaSortFactory(sortType) {
//     let compare = (p1, p2) => {
//         if (p1 > p2) {
//             return 1
//         }
//         if (p1 < p2) {
//             return -1
//         }
//         return 0
//     }

//     let sort = (m1, m2) => compare(m1, m2)
//     if (sortType === sortType.date) {

//         sort = (m1, m2) => compare(new Date(m1.date), new Date(m2.date))
//     }

//     if (sortType === sortType.title) {

//         sort = (m1, m2) => compare(m1.title, m2.title)
//     }


//     if (sortType === sortType.like) {

//         sort = (m1, m2) => compare(m1.likes, m2.likes)
//     }


//     return { sort }



// }
// export default { sortType, mediaSortFactory }