const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const formValidation = {
  firstName: {
    rules: ["IS_NOT_EMPTY"],
  },
  lastName: {
    rules: ["IS_NOT_EMPTY"],
  },
  email: {
    rules: ["IS_NOT_EMPTY", "IS_EMAIL"],
  },
  password: {
    rules: ["IS_NOT_EMPTY"],
  },
};

const validationRules = {
  IS_EMAIL: function (value) {
    let message = "";
    let result = true;

    message = "This is not a valid email";
    result = EMAIL_REGEX.test(value);

    return {
      result,
      message,
    };
  },
  IS_NOT_EMPTY: function (value) {
    let message = "";
    let result = true;

    message = "This value cannot be empty";
    result = value !== "" || value.length !== 0;

    return {
      result,
      message,
    };
  },
};

const validateForm = function () {

  const formErrors = [];
  const formInputs = [...document.querySelectorAll(".registration_form_input")];

  formInputs.map((formInput) => {
    const input = formInput.getElementsByTagName("input")[0];
    const label = formInput.getElementsByTagName("label")[0];

    if (input.type !== "submit") {
      const { id, value } = input;
      const { rules } = formValidation[id];
      rules.map((rule) => {
        const { result, message } = validationRules[rule](value);
        console.log({ id, value, result, message });
        if (!result && !formInput.classList.contains('input_error')) {
          formInput.classList.toggle("input_error");
          label.innerText = message;

          formErrors.push({
            rule,
            result,
            message
          })
        }
      });
    }
  });
  return formErrors;
};

const handleSubmitForm = function (event) {
 
  const formErrors =  validateForm();
  if(formErrors.length === 0){
    alert("Successful Submit!");
  } else {
    alert("You are submitting invalid form values");
  }
};

const handleFormInputTextChange = function (event) {
  const { parentElement } = event.target;

  if (parentElement.classList.contains("input_error")) {
    parentElement.classList.remove("input_error");
  }
};

const inputs = [
  ...document.querySelectorAll(".registration_form_input > input"),
];
inputs.map((input) => {
  input.addEventListener("change", handleFormInputTextChange);
});
