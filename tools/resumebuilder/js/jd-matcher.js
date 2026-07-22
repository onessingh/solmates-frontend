
export function matchSkills(skills, jd){
const jdLower = jd.toLowerCase()
let matched = []

skills.forEach(s=>{
 if(jdLower.includes(s.toLowerCase())){
  matched.push(s)
 }
})

return matched
}
