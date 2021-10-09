// 'Name' field in focus when page first loads
const userName = document.getElementById('name');
userName.focus();

//'Other" field is hidden when page first loads and is shown and user chooses 'Other'
const otherJob = document.getElementById('other-job-role');
otherJob.style.display = 'none';

const userTitle = document.getElementById('title');
userTitle.addEventListener('change', e => {
    if (e.target.value === 'other') {
        otherJob.style.display = '';
    } else otherJob.style.display = 'none';
});

//'Color' field is updated depending on 'Design' field
const userDesign = document.getElementById('design');
const userColor = document.getElementById('color');
const colorOptions = userColor.children;
userColor.disabled = true;

userDesign.addEventListener('change', e=> {
    userColor.disabled = false;
    for (let i=0; i < colorOptions.length; i++) {
        const selectedTheme = e.target.value;
        const themeOption= colorOptions[i].getAttribute('data-theme');
        if (selectedTheme === themeOption) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute('selected', true);
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute('selected');
        }
    }
});

//Updates total cost depending on user selection
const totalAmount = document.getElementById('activities-cost');
const selectedActivities = document.getElementById('activities-box');
let costAll = 0;

selectedActivities.addEventListener('change', e => {
    const selectedCost = parseInt(e.target.getAttribute('data-cost'));
    (e.target.checked)? costAll += selectedCost : costAll -= selectedCost;
    totalAmount.textContent = `Total: $${costAll}`;
});

//Makes credit card default option and updates section if user selects other options
const paymentAll = document.getElementById('payment');
paymentAll.children[1].setAttribute('selected', true);
const creditCard = document.getElementById('credit-card');
creditCard.style.display = '';
const bitcoin = document.getElementById('bitcoin');
bitcoin.style.display = 'none';
const paypal = document.getElementById('paypal');
paypal.style.display = 'none';

paymentAll.addEventListener('change', e =>{
    const selectedPayment = e.target.value;
    if (selectedPayment === 'paypal') {
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
        paypal.style.display = '';
    } else if (selectedPayment === 'credit-card') {
            creditCard.style.display = '';
            bitcoin.style.display = 'none';
            paypal.style.display = 'none';
    } else if (selectedPayment === 'bitcoin') {
        creditCard.style.display = 'none';
        bitcoin.style.display = '';
        paypal.style.display = 'none';
    }
});

// USER INPUT VALIDATORS

const form = document.querySelector('form');
const email = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');

// Cannot be blank or empty
function isNameValid() {
    const valid = /^\s*$/.test(userName.value);
    (!valid)? hintNotRequired(userName) : hintRequired (userName);
    return valid;
}

//Must be a valid email address and contain "@" and ".com"
function isEmailValid() {
    const valid = /^[^@]+\@[^@.]+\.com$/i.test(email.value);
    (valid)? hintNotRequired(email) : hintRequired (email);
    return valid;
}

//At least one activity is selected
function isActivitySelected() {
    const valid = costAll > 0;
    (valid)? hintNotRequired(selectedActivities) : hintRequired (selectedActivities);
    return valid;
};

// Must contain 13-16 digit number, no space and dashes
function isCreditCardValid() {
    const valid = /^(\d{13,16})$/.test(ccNum.value);
    (valid)? hintNotRequired(ccNum) : hintRequired (ccNum);
    return valid;
}

//Must contain 5 digit number
function isZipValid() {
    const valid = /^(\d{5})$/.test(zip.value);
    (valid)? hintNotRequired(zip) : hintRequired (zip);
    return valid;
}

//Must contain 3 digit number
function isCvvValid() {
    const valid = /^(\d{3})$/.test(cvv.value);
    (valid)? hintNotRequired(cvv) : hintRequired (cvv);
    return valid;
}

form.addEventListener('submit', e => {
    
    if (isNameValid()) {
        e.preventDefault();
    } 

    if (!isEmailValid()) {
        e.preventDefault();
    } 
    
    if (!isActivitySelected()) {
        e.preventDefault();
    }
    
    if (creditCard.style.display === '' && !isCreditCardValid()) {
        e.preventDefault();
    }
    
    if (creditCard.style.display === '' && !isZipValid()) {
        e.preventDefault();
    }
    
    if (creditCard.style.display === '' && !isCvvValid()) {
        e.preventDefault();
    }
});

// Adding focus to activities for accessibility
const inputAll = document.querySelectorAll('input[type="checkbox"]');

for (let i=0; i < inputAll.length; i++) {
    inputAll[i].addEventListener('focus', e => {e.target.parentElement.classList.add('focus')});
    inputAll[i].addEventListener('blur', e => {e.target.parentElement.classList.remove('focus')});
}

//Show hints depending on validation results
function hintRequired (element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}

function hintNotRequired (element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = "none";
}