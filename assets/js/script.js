const moreSettingsBtn = document.getElementById("more-settings");
const moreSettingsIcon = document.querySelectorAll(".more-settings .icon");
const dataSubmitBtn = document.getElementById("data-submit-btn");
const dataDurationTime = document.getElementById("data-duration-time");
const dataDurationType = document.getElementById("data-duration-type");
const dataVouchers = document.getElementById("data-vouchers-code");
const dataPageLayout = document.getElementById("data-page-layout");
const dataColorLogo = document.getElementById("data-color-logo");
const dataDurationBG = document.getElementById("data-duration-bg");
const durationInputLine = document.getElementById("duration-input-line");
const voucherInputLine = document.getElementById("voucher-input-line");
const durationErrorMsg = document.getElementById("duration-error-msg");
const voucherErrorMsg = document.getElementById("voucher-error-msg");
const voucherLineCounter = document.getElementById("voucher-line-counter");
const learnMoreBtn = document.getElementById("learn-more-btn");
const learnMoreDialog = document.getElementById("learn-more-dialog");
const dialogCloseBtn = document.getElementById("dialog-close-btn");
const copyCodeBtn = document.getElementById("copy-code-btn");
const copyCodeBlockBtn = document.querySelector(".code-block button");
let lineCountCache = 0;
const codeText = `let scrapedCodes = "";\n
document.querySelectorAll("[name='code'] .td-content .content").forEach((elmnt) => {scrapedCodes += elmnt.innerText + "\\n"});\n
console.log(scrapedCodes);`;

moreSettingsBtn.onchange = () => {
  if (moreSettingsBtn.checked) {
    moreSettingsIcon[0].innerText = "\ue70e";
  } else {
    moreSettingsIcon[0].innerText = "\ue70d";
  }
};

copyCodeBtn.onclick = () => {
  navigator.clipboard
    .writeText(codeText)
    .then(() => {
      copyCodeBtn.innerHTML = `<i class="icon">&#xe73e;</i>Copied to clipboard`;
      setTimeout(() => (copyCodeBtn.innerHTML = `Copy code`), 2000);
    })
    .catch(() => {
      copyCodeBtn.innerHTML = `<i class="icon">&#xe711;</i>Failed to copy`;
      setTimeout(() => (copyCodeBtn.innerHTML = `Copy code`), 2000);
    });
};

const closeModal = (elmnt) => {
  elmnt.classList.remove("open");
  setTimeout(() => elmnt.close(), 200);
};

learnMoreBtn.onclick = () => {
  learnMoreDialog.showModal();
  learnMoreDialog.classList.add("open");
  learnMoreDialog.onclick = (e) => {
    if (e.target === learnMoreDialog) {
      closeModal(learnMoreDialog);
    }
  };
  dialogCloseBtn.onclick = () => {
    closeModal(learnMoreDialog);
  };
  copyCodeBlockBtn.onclick = () => {
    navigator.clipboard
      .writeText(codeText)
      .then(() => {
        copyCodeBlockBtn.innerHTML = `&#xe73e;`;
        setTimeout(() => (copyCodeBlockBtn.innerHTML = `&#xe8c8;`), 2000);
      })
      .catch(() => {
        copyCodeBlockBtn.innerHTML = `&#xe711;`;
        setTimeout(() => (copyCodeBlockBtn.innerHTML = `&#xe8c8;`), 2000);
      });
  };
  document.querySelector("dialog button.ok").onclick = () => closeModal(learnMoreDialog);
};

const setHTMLRoot = (property, value) => document.querySelector(":root").style.setProperty(property, value);

const setDurationTextColor = (hexColor) => {
  const color = hexColor.replace("#", "");
  const red = parseInt(color.substr(0, 2), 16);
  const green = parseInt(color.substr(2, 2), 16);
  const blue = parseInt(color.substr(4, 2), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
  const textColor = luminance > 0.5 ? "#000000" : "#ffffff";
  setHTMLRoot("--duration-text-color", textColor);
};

const saveFormData = () => {
  dataPageLayout.checked ? setHTMLRoot("--page-layout", "13in") : setHTMLRoot("--page-layout", "11in");
  setHTMLRoot("--duration-bg-color", dataDurationBG.value);
  setDurationTextColor(dataDurationBG.value);
  dataColorLogo.checked
    ? setHTMLRoot("--voucher-logo", "url(../svg/wifi-connect-logo.svg)")
    : setHTMLRoot("--voucher-logo", "url(../svg/wifi-connect-logo-black.svg)");

  const documentContainer = document.querySelector(".voucher-preview-container");
  let maxItem;
  const vouchers = dataVouchers.value.split("\n");

  documentContainer.innerHTML = "";
  dataPageLayout.checked ? (maxItem = 60) : (maxItem = 50);
  for (let i = 0; i < Math.ceil(vouchers.length / maxItem); i++) {
    documentContainer.innerHTML += `<section class="flex page-layout"></section>`;
  }
  vouchers.map((code, index) => {
    document.querySelectorAll(".page-layout")[Math.ceil((index + 1) / maxItem - 1)].innerHTML += `
      <div class="relative voucher-container">
        <div class="logo"></div>
        <p class="relative">${code}</p>
        <span class="absolute">${dataDurationTime.value} ${
      Number(dataDurationTime.value) > 1 ? dataDurationType.value + "s" : dataDurationType.value
    }</span>
      </div>`;
  });
  document.getElementById("print-btn").removeAttribute("disabled");
  document.querySelector("main").scrollTop = 0;
};

const triggeredErrorMsgDuration = (value) => {
  const error = value;
  if (error) {
    durationErrorMsg.classList.remove("hidden");
    durationInputLine.classList.add("input-error");
  } else {
    durationErrorMsg.classList.add("hidden");
    durationInputLine.classList.remove("input-error");
  }
};

const triggeredErrorMsgVoucher = (value) => {
  const error = value;
  if (error) {
    voucherErrorMsg.classList.remove("hidden");
    voucherInputLine.classList.add("input-error");
  } else {
    voucherErrorMsg.classList.add("hidden");
    voucherInputLine.classList.remove("input-error");
  }
};

dataVouchers.addEventListener("scroll", () => {
  voucherLineCounter.scrollTop = dataVouchers.scrollTop;
  voucherLineCounter.scrollLeft = dataVouchers.scrollLeft;
});

const updateLineCounter = () => {
  const lineCount = dataVouchers.value.split("\n").length;
  const outarr = new Array();
  if (lineCountCache != lineCount) {
    for (let x = 0; x < lineCount; x++) {
      outarr[x] = x + 1;
    }
    voucherLineCounter.value = outarr.join("\n");
  }
  lineCountCache = lineCount;
};

dataVouchers.addEventListener("input", () => {
  updateLineCounter();
});

dataSubmitBtn.onclick = () => {
  triggeredErrorMsgDuration(false);
  triggeredErrorMsgVoucher(false);
  if (
    (dataDurationTime.value.length <= 0 && dataVouchers.value.length < 6) ||
    (dataDurationTime.value == 0 && dataVouchers.value.length < 6)
  ) {
    triggeredErrorMsgDuration(true);
    triggeredErrorMsgVoucher(true);
  } else if (dataDurationTime.value.length <= 0 || dataDurationTime.value == 0) {
    triggeredErrorMsgDuration(true);
  } else if (dataVouchers.value.length < 6) {
    triggeredErrorMsgVoucher(true);
  } else {
    triggeredErrorMsgDuration(false);
    triggeredErrorMsgVoucher(false);
    saveFormData();
  }
};

const mediaScreen = window.matchMedia("(max-width: 800px)");
const checkMediaScreen = () => {
  if (!mediaScreen.matches) {
    document.querySelector(".header-container").innerHTML = `<h1>Generated Preview</h1>
    <button id="print-btn" class="btn-standard" ${
      !document.querySelector(".get-started") ? "" : "disabled"
    }><i class="icon">&#xe749;</i>Print vouchers</button>`;
  } else {
    document.querySelector(
      ".header-container"
    ).innerHTML = `<img src="assets/svg/wifi-connect-logo.svg" alt="Wi-Fi Connect Logo" class="logo-img" />
    <button id="print-btn" class="btn-standard" ${
      !document.querySelector(".get-started") ? "" : "disabled"
    }><i class="icon">&#xe749;</i></button>`;
  }
  document.getElementById("print-btn").onclick = () => print();
};
checkMediaScreen();
mediaScreen.onchange = () => {
  checkMediaScreen();
};
