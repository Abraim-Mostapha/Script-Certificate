const textArea = document.querySelector("textarea");
const btn_gen = document.getElementById("gen-cta"); 
const srcImage = "media/certificate_template.jpeg";






// Function Grab The User Input Field Values
function getNames(){
    var input_values = document.querySelector("textarea").value;
    var usersList = [];
    usersList = input_values.split("\n");
    return usersList;
}




// Function Count People List
function countNames(){
    var userLength = getNames().length;
    document.getElementById("nbr-prt").innerHTML = userLength;
}





// Function That Change The Content when the User Click Generating Cta
function changeContentComponent(){
    var para = document.querySelector(".text-help");
    para.innerHTML = "Ready to print? <br> Look at your certificates first to make sure they're correct before you waste a lot of paper."
    var inputSection = document.querySelector(".input-part");
    inputSection.style.display = "none";

    var headingSection = document.getElementById("frt-cnt");
    var button = document.createElement("button");
    button.innerHTML = "Print Certficate Now";
    button.id = "prt-cta";
    headingSection.appendChild(button)
    // Add a CallBack For Printing
    button.addEventListener("click",function(){
        printImage(ImagetoPrint)
    })
}







// Function That Generate The Certficates with name
function generateCertificates(username){
    var certificates_container = document.querySelector("#content")

    var certificate = document.createElement("div");
    certificate.className = "certificate";

    var personeName = document.createElement("h1");
    personeName.innerHTML = username;

    var image_certificate = document.createElement("img");
    image_certificate.src = srcImage;

    certificates_container.appendChild(certificate);
    certificate.appendChild(personeName);
    certificate.appendChild(image_certificate);
}





// Function That Display The Certficates on The Screen
function displayCertificates(){
    const personList = getNames();
    const listLength = personList.length;
    let i = 0;

    for (i ; i < listLength ; i++){
        let username = personList[i]
        if (username == ""){
            continue
        }
        else{
            generateCertificates(username)
        }
    }
}





// Executes The Function when User Enter Names
textArea.addEventListener("keydown",countNames)
btn_gen.addEventListener("click",()=>{
    var names = getNames();
    var firstLetter = names[0]

    if (names.length <= 1 && firstLetter == ""){
        alert("Invalid: Please Input Something");
    }

    else{
        changeContentComponent();
        displayCertificates();
    }
})





// Function add The Image with src To The context we gonna Print
function ImagetoPrint(username){
     return "<html><head><scri"+"pt>function step1(){\n" +
             "setTimeout('step2()', 10);}\n" +
             "function step2(){window.print();window.close()}\n" +
             "</scri" + "pt></head><body onload='step1()'>\n" +
             "<div class='certificate' style='width:300px;border: 1px solid #068d8f'>"+
             "<h1 style='position: absolute;z-index: 200;transform: translateY(300px);left: 350px;font-size: 100px;font-family: sans-serif;'>"+username+"</h1>"+
             "<img src='" + srcImage + "'/></div></body></html>";
}





// Function Iterate over the Names and Print The Certficates
function printImage(callback){
    var names = getNames()
    let i = 0;
    var Pagelink = "about:blank";
    var pwa = window.open(Pagelink, "_new");
    pwa.document.open();

    for (i;i < names.length ; i++){
        if (names[i] == ""){
            continue;
        }
        else{
            pwa.document.write(callback(names[i]));
        }
    }

    pwa.document.close();
}


