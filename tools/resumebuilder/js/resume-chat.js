
window.resumeChat = function(){

const input = document.getElementById("chatInput").value.toLowerCase()
let response = ""

if(input.includes("summary")){
 response = "Tip: Start with a strong summary highlighting years of experience and core skills."
}
else if(input.includes("skills")){
 response = "List both technical and soft skills. Example: JavaScript, React, Communication."
}
else if(input.includes("experience")){
 response = "Use bullet points and quantify achievements (e.g., improved performance by 30%)."
}
else{
 response = "Try asking about summary, skills, or experience."
}

document.getElementById("chatOutput").innerText = response

}
