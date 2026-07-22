
import {calculateATS} from './ats-checker.js'
import {generateBullets} from './bullet-generator.js'
import {matchSkills} from './jd-matcher.js'

window.runResumeAI = function(){

const skills = document.getElementById("skills").value.split(",")
const jd = document.getElementById("jobdesc").value
const resume = document.getElementById("resumeText").value

const ats = calculateATS(resume, jd)
document.getElementById("atsScore").innerText = ats + "%"

const bullets = generateBullets(skills)
document.getElementById("bullets").innerText = bullets.join("\n")

const matched = matchSkills(skills, jd)
document.getElementById("matchedSkills").innerText = matched.join(", ")
}
