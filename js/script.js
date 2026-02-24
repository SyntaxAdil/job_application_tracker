const tabButtons = document.querySelector(".btn-group");
const cardSections = document.querySelectorAll(".card-section section");
let totalJobs = getFromId("total-jobs");

const allSections = getFromId("all-section");

const interViewSeciton = getFromId("interview-section");
const rejectedSeciton = getFromId("rejected-section");
const appliedSection = getFromId("applied-section");

const dltModal = getFromId("dlt-modal");
// blank array
let interviewArr = [];
let rejectedArr = [];
let appliedArr = [];

// logic for toggling tabs and update ui
tabButtons.addEventListener("click", (e) => {
  let button = e.target.closest("button");
  if (!button) return;
  const target = button.dataset.target;
  if (!target) return;
  for (let element of tabButtons.children) {
    element.classList.remove("btn-active");
  }
  button.classList.add("btn-active");
  cardSections.forEach((section) => {
    section.classList.add("hidden");
  });

  if (target === "interview-section") {
    formattingJobsCount(interviewArr);
  } else if (target === "rejected-section") {
    formattingJobsCount(rejectedArr);
  } else if (target === "applied-section") {
    formattingJobsCount(appliedArr);
  } else {
    totalJobs.innerHTML = ` ${zeroAdd(allSections.children)} Jobs`;
  }

  const activeTab = getFromId(target);
  if (activeTab) {
    activeTab.classList.remove("hidden");
  }
});

updateCount();

document.addEventListener("click", (e) => {
  const card = e.target.closest(".wrapper");
  if (!card) return;
  if (e.target.closest(".fa-trash")) {
    dltModal.classList.remove("hidden");
    dltModal.addEventListener("click", (d) => {
      if (d.target.closest(".btn-success")) {
        dltModal.classList.add("hidden");
        Array.from(allSections.children).forEach((cards) => {
          if (
            cards.querySelector("h3").innerText.trim() ===
              card.querySelector("h3").innerText.trim() &&
            cards.querySelector(".job-position").innerText.trim() ===
              card.querySelector(".job-position").innerText.trim()
          ) {
            allSections.removeChild(cards);
          }
        });

        const jobTitle = card.querySelector("h3").innerText.trim();
        const jobPosition = card
          .querySelector(".job-position")
          .innerText.trim();

        // dlt logic
        interviewArr = interviewArr.filter(
          (i) => !(i.jobTitle === jobTitle && i.jobPosition === jobPosition),
        );
        rejectedArr = rejectedArr.filter(
          (i) => !(i.jobTitle === jobTitle && i.jobPosition === jobPosition),
        );
        appliedArr = appliedArr.filter(
          (i) => !(i.jobTitle === jobTitle && i.jobPosition === jobPosition),
        );
        renderAll();
        syncTotalJobs();
        
        if (allSections.children.length === 0) {
          getFromId("no-jobs").classList.remove("hidden");
        }
        updateCount();
        return;
      } else if (d.target.closest(".btn-error")) {
        dltModal.classList.add("hidden");
        return;
      }
    });
  }
  if (
    !e.target.closest(".btn-success") &&
    !e.target.closest(".btn-error") &&
    !e.target.closest(".btn-info")
  ) {
    return;
  }
  const jobStatusBadge = card.querySelector(".job-status");
  const jobInfo = {
    jobTitle: card.querySelector("h3").innerText,
    jobPosition: card.querySelector(".job-position").innerText,
    jobType: card.querySelector(".job-type").innerText,
    jobTime: card.querySelector(".job-time").innerText,
    jobSalary: card.querySelector(".job-salary").innerText,
    jobStatus: card.querySelector(".job-status").innerText,
    jobDescription: card.querySelector(".job-description").innerText,
  };
  if (e.target.closest(".btn-success")) {
    dupRemoveAll(jobInfo);
    jobInfo.jobStatus = "Interview";
    jobStatusBadgeToggle(jobStatusBadge, "Interview", "bg-success");
    interviewArr.push(jobInfo);

    cardClassToggle(card, "border-green-500");
    console.log("Interview array ", interviewArr);
  } else if (e.target.closest(".btn-error")) {
    dupRemoveAll(jobInfo);
    jobInfo.jobStatus = "Rejected";
    jobStatusBadgeToggle(jobStatusBadge, "Rejected", "bg-error");
    rejectedArr.push(jobInfo);

    cardClassToggle(card, "border-red-500");
    console.log("rejected array ", rejectedArr);
  } else if (e.target.closest(".btn-info")) {
    dupRemoveAll(jobInfo);
    jobInfo.jobStatus = "Applied";
    jobStatusBadgeToggle(jobStatusBadge, "Applied", "bg-info");
    appliedArr.push(jobInfo);

    cardClassToggle(card, "border-blue-500");
    console.log("applied array ", appliedArr);
  }

  renderAll();
  updateCount();
  syncTotalJobs()
});

totalJobs.innerHTML = ` ${zeroAdd(allSections.children)} Jobs`;
