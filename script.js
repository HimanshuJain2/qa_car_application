function showHome() {
    document.getElementById("home").style.display = "block"; // Show Home content
    document.getElementById("carouselExample").style.display = "block"; // Show Carousel
    document.getElementById("inquiryForm").style.display = "none"; // Hide Inquiry form
}

function showForm(formId) {
    document.getElementById('inquiryForm').style.display = 'none';
    document.getElementById(formId).style.display = 'block';
    document.getElementById("carouselExample").style.display = "none";
}
document.getElementById("inquiryFormElement").addEventListener("submit", function(event) {
    event.preventDefault();
    if (validateForm()) {
        submitForm();
    }
});



function validateText(input) {
    input.value = input.value.replace(/[^a-zA-Z ]/g, "");
}
function validateMobile(input) {
    input.value = input.value.replace(/[^0-9]/g, "");
    if (input.value.length > 10) {
        input.value = input.value.slice(0, 10);
    }
}
function validateForm() {
    let mobile = document.getElementById("inqMobile").value;
    let email = document.getElementById("inqEmail").value;
    let mobileRegex = /^[6-9]\d{9}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!mobileRegex.test(mobile)) {
        alert("Invalid Mobile Number. Please enter a valid 10-digit Indian mobile number.");
        return false;
    }
    if (!emailRegex.test(email)) {
        alert("Invalid Email Address. Please check your email format e.g. example@gmail.com");
        return false;
    }
    return true;
}
function submitForm() {
    var requestBody = JSON.stringify({
        "first_name": document.getElementById("inqFName").value,
        "last_name": document.getElementById("inqLName").value,
        "mobile": document.getElementById("inqMobile").value,
        "model": document.getElementById("inqModel").value,
        "showroom": document.getElementById("inqShowroom").value,
        "email": document.getElementById("inqEmail").value
    });

    var client = new XMLHttpRequest();
    client.open("POST", "https://dev303538.service-now.com/api/now/table/sn_lead_mgmt_core_lead?sysparm_fields=number");
    client.setRequestHeader('Accept', 'application/json');
    client.setRequestHeader('Content-Type', 'application/json');
    client.setRequestHeader('Authorization', 'Basic ' + btoa('prateek.dev:Cyntexa@123'));

    client.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status === 200 || this.status === 201) {
                // Show the Thank You modal
                var thankYouModal = new bootstrap.Modal(document.getElementById('thankYouModal'));
                thankYouModal.show();

                // Reset the form fields after successful submission
                document.getElementById("inquiryFormElement").reset();
            }  else if (this.status === 403) {
                // Show lead already exists modal
                var existingLeadModal = new bootstrap.Modal(document.getElementById('existingLeadModal'));
                existingLeadModal.show();
            } else {
                alert("There was an issue submitting your inquiry. Please try again.");
            }
        }
    };
    
    client.send(requestBody);
}
