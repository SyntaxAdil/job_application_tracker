function getFromId(id) {
  return document.getElementById(id);
}
function formattingJobsCount(jobs) {
  totalJobs.innerHTML = `${zeroAdd(jobs)} / ${zeroAdd(allSections.children)} Jobs`;
}
function updateCount() {
  getFromId("total-display").innerHTML = zeroAdd(allSections.children);
  getFromId("applied-display").innerHTML = zeroAdd(appliedArr);
  getFromId("interview-display").innerHTML = zeroAdd(interviewArr);
  getFromId("rejected-display").innerHTML = zeroAdd(rejectedArr);
}

function zeroAdd(target) {
  const len = Array.isArray(target) ? target.length : Array.from(target).length;
  return `${len < 10 ? "0" + len : len}`;
}
function renderAll() {
  renderData(interViewSeciton, interviewArr);
  renderData(rejectedSeciton, rejectedArr);
  renderData(appliedSection, appliedArr);
}

function jobStatusBadgeToggle(jobStatusBadge, text, newClass) {
  jobStatusBadge.innerText = text;
  jobStatusBadge.classList.remove("custom-job-status");
  jobStatusBadge.classList.remove("bg-error");
  jobStatusBadge.classList.remove("bg-success");

  jobStatusBadge.classList.add(newClass);
}

function cardClassToggle(card, newClass) {
  card.classList.remove("border-red-500");
  card.classList.remove("border-slate-700");
  card.classList.remove("border-green-500");
  card.classList.remove("border-blue-500");

  card.classList.add(newClass);
}

function dupRemoveAll(jobInfo) {
  interviewArr = interviewArr.filter(
    (i) =>
      !(
        i.jobTitle === jobInfo.jobTitle && i.jobPosition === jobInfo.jobPosition
      ),
  );
  rejectedArr = rejectedArr.filter(
    (i) =>
      !(
        i.jobTitle === jobInfo.jobTitle && i.jobPosition === jobInfo.jobPosition
      ),
  );
  appliedArr = appliedArr.filter(
    (i) =>
      !(
        i.jobTitle === jobInfo.jobTitle && i.jobPosition === jobInfo.jobPosition
      ),
  );
  
}
function syncTotalJobs() {
  const activeTarget = tabButtons.querySelector(".btn-active")?.dataset.target;
  if (activeTarget === "interview-section") {
    formattingJobsCount(interviewArr);
  } else if (activeTarget === "rejected-section") {
    formattingJobsCount(rejectedArr);
  } else if (activeTarget === "applied-section") {
    formattingJobsCount(appliedArr);
  } else {
    totalJobs.innerHTML = `${zeroAdd(allSections.children)} Jobs`;
  }
}
function renderData(to, from) {
  if (from.length === 0) {
    to.innerHTML = `
       <div class="bg-slate-700 w-full py-40 rounded-2xl flex items-center justify-center shadow-md" >
              <div class="flex flex-col items-center gap-2 text-center">
                <img src="./assets/noJobs.png" alt="no jobs" />
                <h1 class="text-2xl text-slate-200 font-semibold">
                  No jobs available
                </h1>
                <p class="text-lg max-w-[70%] md:text-2xl text-slate-400">
                  Check back soon for new job opportunities
                </p>
              </div>
            </div>
       `;
  } else {
    to.innerHTML = from
      .map((item) => {
        return ` 
        <div class="wrapper fade-up w-full p-4 rounded-lg bg-slate-700 px-6 border-l-3 ${item.jobStatus === "Interview" ? " border-green-500 " : item.jobStatus === "Applied" ? "border-blue-500" : " border-red-500  "} ">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-semibold text-base-100 text-xl">
                    ${item.jobTitle}
                  </h3>
                  <p class="text-base-300 job-position  ">${item.jobPosition}</p>
                </div>
                <span><i class="fas fa-trash"></i></span>
              </div>
                 <div class="flex items-center gap-2 text-slate-400 mt-2 text-sm  ">
                <span class="job-type">${item.jobType}</span>
                <span class="w-1 h-1 inline-block rounded-full bg-slate-400"></span>
                <span class="job-time">${item.jobTime}</span>
                <span class="w-1 h-1 inline-block rounded-full bg-slate-400"></span>
                <span class="job-salary">${item.jobSalary}</span>
                

              </div>
              <div class="space-y-4 my-4">
                <span
                  class="job-status px-4 py-2 rounded-md ${item.jobStatus === "Interview" ? "bg-success" : item.jobStatus === "Applied" ? "bg-info" : "bg-error"} uppercase inline-block font-semibold text-[12px]"
                  >${item.jobStatus}</span
                >
                <p class="text-base-300 job-description">
                  ${item.jobDescription}
                </p>
                <div class="space-x-2">
                <button ${item.jobStatus === "Applied" ? "disabled" : ""} class="btn btn-outline btn-info">Applied</button>
                <button ${item.jobStatus === "Interview" ? "disabled" : ""} class="btn  btn-outline btn-success">Interview</button>
                <button ${item.jobStatus === "Rejected" ? "disabled" : ""} class="btn btn-outline btn-error">Rejected</button>
                </div>
              </div>
            </div>
`;
      })
      .join("");
  }
}
