document.addEventListener("DOMContentLoaded", function () {
  let selectedBloodType = "";
  
  const bloodGridItems = document.querySelectorAll("#bloodTypeGrid .grid-item");
  const urgencyCards = document.querySelectorAll(".urgency-card");
  const unitInput = document.getElementById("unitCount");
  const locationInput = document.getElementById("locationInput");
  
  const livePreviewCard = document.getElementById("livePreviewCard");
  const previewBadge = document.getElementById("previewBadge");
  const previewBloodBadge = document.getElementById("previewBloodBadge");
  const previewLocationName = document.getElementById("previewLocationName");
  const previewUnitLabel = document.getElementById("previewUnitLabel");

  bloodGridItems.forEach(item => {
    item.addEventListener("click", function() {
      bloodGridItems.forEach(i => i.classList.remove("selected"));
      this.classList.add("selected");
      selectedBloodType = this.getAttribute("data-value");
      document.getElementById("bloodTypeError").innerText = "";
      updateLivePreviewCard();
    });
  });

  urgencyCards.forEach(card => {
    const radio = card.querySelector("input[type='radio']");
    card.addEventListener("click", function() {
      urgencyCards.forEach(c => c.classList.remove("active"));
      this.classList.add("active");
      radio.checked = true;
      document.getElementById("urgencyError").innerText = "";
      updateLivePreviewCard();
    });
  });

  document.getElementById("incrementUnits").addEventListener("click", () => {
    unitInput.value = parseInt(unitInput.value) + 1;
    updateLivePreviewCard();
  });

  document.getElementById("decrementUnits").addEventListener("click", () => {
    if (parseInt(unitInput.value) > 1) {
      unitInput.value = parseInt(unitInput.value) - 1;
      updateLivePreviewCard();
    }
  });

  locationInput.addEventListener("input", () => {
    previewLocationName.innerText = locationInput.value.trim() || "No Location Set";
  });

  function updateLivePreviewCard() {
    previewBloodBadge.innerText = selectedBloodType || "?";
    livePreviewCard.className = "request-preview-card";
    previewBadge.className = "badge";

    const activeRadio = document.querySelector("input[name='urgency']:checked");
    const urgencyVal = activeRadio ? activeRadio.value : "Normal";

    if (urgencyVal === "Critical") {
      livePreviewCard.classList.add("border-critical");
      previewBadge.classList.add("badge-critical");
      previewBadge.innerText = "CRITICAL";
    } else if (urgencyVal === "Urgent") {
      livePreviewCard.classList.add("border-urgent");
      previewBadge.classList.add("badge-urgent");
      previewBadge.innerText = "URGENT";
    } else {
      livePreviewCard.classList.add("border-normal");
      previewBadge.classList.add("badge-normal");
      previewBadge.innerText = "NORMAL";
    }
    previewUnitLabel.innerText = `${unitInput.value} Unit${unitInput.value > 1 ? 's' : ''} required • Just now`;
  }

  document.getElementById("bloodRequestForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let valid = true;

    if(!selectedBloodType) {
      document.getElementById("bloodTypeError").innerText = "Please specify a required blood classification type.";
      valid = false;
    }
    if(!document.querySelector("input[name='urgency']:checked")) {
      document.getElementById("urgencyError").innerText = "Urgency parameter level selection is mandatory.";
      valid = false;
    }
    if(locationInput.value.trim() === "") {
      document.getElementById("locationError").innerText = "Please detail target location establishment facility name.";
      valid = false;
    }

    if(valid) {
      alert("Blood Request published successfully!");
    }
  });
});