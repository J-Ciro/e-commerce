import getUser from "../services/getUser.js";

const logo = document.querySelector(".logo")

logo.addEventListener("click", () =>{
  window.location.href = "../index.html"
})

//-----------------------Declarar Variables y constantes---------
const formLogin = document.querySelector(".main__form");

// -- Login alert
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

//-------------------Declarar funciones-------------

const validateForm = () => {
  const formData = {};
  let emptyField = "";
  const inputsNodeList = document.querySelectorAll("input");
  const labelsNodeList = document.querySelectorAll("label");
  const inputs = Array.from(inputsNodeList);
  const labels = Array.from(labelsNodeList);
  console.log(inputs);

  inputs.forEach((item) => {
    if (item.id) {
      formData[item.id] = item.value;
    }
  });

  for (const key in formData) {
    if (!formData[key]) {
      const label = labels.find((item) => item.getAttribute("for") === key);
      const labelInnerText = label.innerText.substring(
        0,
        label.innerText.length - 1
      );
      emptyField += `${labelInnerText} `;
    }
  }
  console.log(formData)

  if (emptyField) {
    return {
      data: {},
      message: `Campos vacíos: ${emptyField}`,
    };
  } else {
    return {
      data: formData,
      message: "",
    };
  }
};

const submitLogin = async (form) => {
  const userLogin = validateForm();
  console.log(userLogin)
  if (userLogin.message) {
    Toast.fire({
      icon: 'error',
      title: `${userLogin.message}`
    })
  } else {
    const user = await getUser(
      userLogin.data.username,
      userLogin.data.password
    );
    if (user.length) {
      Toast.fire({
        icon: 'success',
        title: `Bienvenido ${userLogin.message}`
      }).then(() => {
        sessionStorage.setItem("user", JSON.stringify(user[0]));
        window.location = "admin.html";
      });
    } else {
      Toast.fire({
        icon: 'error',
        title: `${userLogin.message}`
      }).then(() => {
        form.reset();
      });
    }
  }
};
//----------------------------Ejecución--------------

formLogin.addEventListener("submit", async(event) => {
  event.preventDefault();
  await submitLogin(formLogin);
});