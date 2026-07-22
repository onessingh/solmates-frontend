
export function calculateATS(resumeText, jdText){
const resumeWords = resumeText.toLowerCase().split(/\W+/)
const jdWords = jdText.toLowerCase().split(/\W+/)

let match = 0
jdWords.forEach(w=>{
 if(resumeWords.includes(w)){ match++ }
})

const score = Math.min(100, Math.round((match / (jdWords.length||1)) * 100))
return score
}
