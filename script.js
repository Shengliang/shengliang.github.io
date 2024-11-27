document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");

  // Function to generate time slots based on the day of the week
  function generateTimeSlots(date) {
    const dayOfWeek = new Date(date).getDay(); // 0 = Sunday, 6 = Saturday
    let startHour, endHour;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekend: 8 AM to 10 PM
      startHour = 8;
      endHour = 22;
    } else {
      // Weekday: 7 PM to 10 PM
      startHour = 19;
      endHour = 22;
    }

    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour % 12 || 12}:00 ${hour >= 12 ? "PM" : "AM"}`);
      slots.push(`${hour % 12 || 12}:30 ${hour >= 12 ? "PM" : "AM"}`);
    }
    return slots;
  }

  // Generate a simple calendar (current month only)
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  calendarEl.innerHTML = `<h2>${currentMonth} ${currentYear}</h2>`;
  const calendarGrid = document.createElement("div");
  calendarGrid.style.display = "grid";
  calendarGrid.style.gridTemplateColumns = "repeat(7, 1fr)";
  calendarGrid.style.gap = "10px";

  for (let i = 1; i <= daysInMonth; i++) {
    const dayEl = document.createElement("button");
    dayEl.textContent = i;
    dayEl.style.padding = "10px";
    dayEl.style.border = "1px solid #ccc";
    dayEl.style.backgroundColor = "#fff";
    dayEl.style.cursor = "pointer";

    // Handle day click
    dayEl.addEventListener("click", () => {
      const selectedDate = `${currentYear}-${today.getMonth() + 1}-${i}`;
      dateInput.value = selectedDate;

      // Populate available time slots
      const slots = generateTimeSlots(selectedDate);
      timeSelect.innerHTML = slots
        .map(slot => `<option value="${slot}">${slot}</option>`)
        .join("");
    });

    calendarGrid.appendChild(dayEl);
  }

  calendarEl.appendChild(calendarGrid);
});

