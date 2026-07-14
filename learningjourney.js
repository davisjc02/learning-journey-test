
    // === SVG arrow ===
    const termArrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 32"><g transform="scale(0.04) translate(0,-2420)"><path fill="#279059" d="m 2254,3177 -45,-45 31,0 31,0 0,-7 c 1,-29 -16,-46 -47,-55 -5,-2 -56,-2 -983,-2 l -977,-2 -10,-2 c -48,-11 -77,-42 -88,-95 L 165,2960 V 2810 c 0,-160 -0,-154 5,-174 5,-18 14,-33 27,-47 13,-13 27,-21 47,-28 C 267,2554 169,2555 1248,2555 c 881,0 969,-0 976,-2 24,-5 38,-20 45,-46 2,-8 2,-10 3,-58 l 0.37,-50 h 27 27 l 0,52 c 0,56 -1,58 -7,79 -9,30 -32,57 -60,69 -11,5 -13,6 -26,8 -8,2 -60,2 -985,2 l -977,1 -11,4 c -22,8 -34,19 -39,39 -2,6 -2,16 -2,157 0,143 0,150 2,158 4,16 13,30 23,37 3,2 10,5 14,7 l 8,3 977,1 c 896,1 978,1 985,2 12,3 16,4 27,8 33,14 56,39 65,73 2,9 5,27 5,35 0,0 14,1 32,1 h 32 l -45,45 c -25,25 -45,45 -46,45 0,0 -21,-20 -45,-45 z" /></g></svg>`;


    async function getJSONData(path) {
      const response = await fetch(path);
        if (!response.ok) {throw new Error(`Failed to load ${path}`);}
      return await response.json();
    }


    function showSubjectButtons(block) {
      document.getElementById("ks4-gcse-button-block").style.display = "none";
      document.getElementById("ks4-btec-button-block").style.display = "none";
      document.getElementById("ks4-cambnat-button-block").style.display = "none";
      document.getElementById(block).style.display = "flex";
    }


    function renderBox(text) {

      const length = text.length;

      let lines;
      switch (true) {

        case (length > 60):
          lines = splitText(text, length, length / 6);
          break;

        case (length > 45):
          lines = splitText(text, length, length / 5);
          break;

        case (length > 30):
          lines = splitText(text, length, length / 4);
          break;

        case (length > 15):
          lines = splitText(text, length, length / 3);
          break;

        default:
          lines = [text];
      }

      return `<li class="textbox">
        ${lines.map(l => `<span>${l}</span>`).join("")}
      </li>`;
    }


    function splitText(text, length, minLength) {

      const lines = [];

      let startPoint = 0;
      let splitPoint = minLength

      while (splitPoint < length) {

        if (text.at(splitPoint) == " ") {

          const newLine = text.slice(startPoint, splitPoint)
          lines.push(newLine);
          startPoint = splitPoint + 1;
          splitPoint = splitPoint + (minLength)

        }

        splitPoint = splitPoint + 1;
      }

      lines.push(text.slice(startPoint));

      return lines;
    }


    function renderTerm(name, term) {
      if (!term) return "";

      return `
        <section class="term-section">
          ${termArrowSVG}
          <h5 class="term-name">${name} term</h5>
          <h6 class="screenreader-only">${name} term, first half</h6>
          <ul class="term-list first-half">
            ${(term.first || []).map(renderBox).join("")}
          </ul>
          <h6 class="screenreader-only">${name} term, second half</h6>
          <ul class="term-list second-half">
            ${(term.second || []).map(renderBox).join("")}
          </ul>
        </section>
      `;
    }

    function renderJourney(journeys, subject) {

      const data = journeys[subject];
      if (!data) {
        console.warn(`No journey data found for: ${subject}`);
        document.getElementById("learning-journey-root").innerHTML = `<p>No journey found for "${subject}"</p>`;
        return;
      }

      let titleHtml;
      if (subject=="pshee") {  // EDGE CASE!!
        titleHtml = `<h4 style="font-size: 13px;">${data.title}<h4>`
      } else {
        titleHtml = `<h4>${data.title}<h4>`
      }

      document.getElementById("learning-journey-root").innerHTML = `
        <div class="learning-journey-green">

          <section class="top-section">
            <h3>Learning Journey</h3>
            <div class="subject">
              ${titleHtml}
              <h5>${data.level}</h5>
            </div>
          </section>

          ${renderTerm("Autumn", data.terms.autumn)}
          ${renderTerm("Spring", data.terms.spring)}
          ${renderTerm("Summer", data.terms.summer)}

        </div>
      `;

    }


    function populateKS3Buttons(buttons) {
      if (document.getElementById("ks3-button-block").children.length === 0) {
        for (const key in buttons) {document.getElementById("ks3-button-block").innerHTML
            += `<button class="ks3-subject-btn" type="button" data-subject="${key}">${buttons[key]}</button>`;}
      }
    }

    function populateKS4QualificationButtons(buttons) {
      if (document.getElementById("ks4-qualification-button-block").children.length === 0) {
        for (const key in buttons) {document.getElementById("ks4-qualification-button-block").innerHTML
            += `<button class="ks4-qualification-btn" type="button" data-qualification="${key}">${buttons[key]}</button>`;}
      }
    }

    function populateKS4Buttons(gcseButtons, btecButtons, cambnatButtons) {
      if (document.getElementById("ks3-button-block").children.length === 0) {
        for (const key in gcseButtons) {document.getElementById("ks4-gcse-button-block").innerHTML
            += `<button class="ks4-gcse-subject-btn" type="button" data-subject="${key}">${gcseButtons[key]}</button>`;}
      }
      if (document.getElementById("ks4-btec-button-block").children.length === 0) {
        for (const key in btecButtons) {document.getElementById("ks4-btec-button-block").innerHTML
              += `<button class="ks4-btec-subject-btn" type="button" data-subject="${key}">${btecButtons[key]}</button>`;}
      }
      if (document.getElementById("ks4-cambnat-button-block").children.length === 0) {
        for (const key in cambnatButtons) {document.getElementById("ks4-cambnat-button-block").innerHTML
            += `<button class="ks4-cambnat-subject-btn" type="button" data-subject="${key}">${cambnatButtons[key]}</button>`;
        }
      }
    }


    function hookUpKS3Buttons(journeys) {
      // on click: highlight current button, render the journey
      document.querySelectorAll(".ks3-subject-btn").forEach(btn => {

        btn.addEventListener("click", () => {

          // unhighlight all the buttons then highlight the clicked one
          document.querySelectorAll(".ks3-subject-btn").forEach(b => {b.classList.remove("current-btn");});
          btn.classList.add("current-btn");

          const subject = btn.dataset.subject;
          renderJourney(journeys, subject);
        });
      });
    }


    function hookUpKS4(gcseJourneys, btecJourneys, cambnatJourneys) {

      let qualification = "gcse";

      let gcseSubject = "art";
      let btecSubject = "creative-media-prod";
      let cambnatSubject = "engin-manuf";

      document.querySelectorAll(".ks4-qualification-btn").forEach(btn => {
        if (btn.dataset.qualification == qualification) {
          btn.classList.add("current-btn");
        } else {
          btn.classList.remove("current-btn");
        }
      });

      document.querySelectorAll(".ks4-gcse-subject-btn").forEach(btn => {
        if (btn.dataset.subject == gcseSubject) {
          btn.classList.add("current-btn");
        } else {
          btn.classList.remove("current-btn");
        }
      });

      document.querySelectorAll(".ks4-btec-subject-btn").forEach(btn => {
        if (btn.dataset.subject == btecSubject) {
          btn.classList.add("current-btn");
        } else {
          btn.classList.remove("current-btn");
        }
      });

      document.querySelectorAll(".ks4-cambnat-subject-btn").forEach(btn => {
        if (btn.dataset.subject == cambnatSubject) {
          btn.classList.add("current-btn");
        } else {
          btn.classList.remove("current-btn");
        }
      });

      // hook up the qualification buttons
      // on click: highlight the current button, show the buttons,
      // specify what data to use and render the current journey
      document.querySelectorAll(".ks4-qualification-btn").forEach(btn => {

        btn.addEventListener("click", () => {

          // unhighlight all the buttons then highlight the clicked one
          document.querySelectorAll(".ks4-qualification-btn").forEach(b => {b.classList.remove("current-btn");});
          btn.classList.add("current-btn");

          const qualification = btn.dataset.qualification;
          if (qualification=="gcse") {
            showSubjectButtons("ks4-gcse-button-block");
            renderJourney(gcseJourneys, gcseSubject);
          } else if (qualification=="btec") {
            showSubjectButtons("ks4-btec-button-block");
            renderJourney(btecJourneys, btecSubject);
          } else {
            showSubjectButtons("ks4-cambnat-button-block");
            renderJourney(cambnatJourneys, cambnatSubject);
          }
        });
      });

      // hook up the gcse subject buttons
      // on click: highlight current button, render the journey
      document.querySelectorAll(".ks4-gcse-subject-btn").forEach(btn => {

        btn.addEventListener("click", () => {

          // unhighlight all the buttons then highlight the clicked one
          document.querySelectorAll(".ks4-gcse-subject-btn").forEach(b => {b.classList.remove("current-btn");});
          btn.classList.add("current-btn");

          renderJourney(gcseJourneys, btn.dataset.subject);
        });
      });

      // hook up the btec subject buttons
      // on click: highlight current button, render the journey
      document.querySelectorAll(".ks4-btec-subject-btn").forEach(btn => {

        btn.addEventListener("click", () => {

          // unhighlight all the buttons then highlight the clicked one
          document.querySelectorAll(".ks4-btec-subject-btn").forEach(b => {b.classList.remove("current-btn");});
          btn.classList.add("current-btn");

          renderJourney(btecJourneys, btn.dataset.subject);
        });
      });

      // hook up the cambnat subject buttons
      // on click: highlight current button, render the journey
      document.querySelectorAll(".ks4-cambnat-subject-btn").forEach(btn => {

        btn.addEventListener("click", () => {

          // unhighlight all the buttons then highlight the clicked one
          document.querySelectorAll(".ks4-cambnat-subject-btn").forEach(b => {b.classList.remove("current-btn");});
          btn.classList.add("current-btn");

          renderJourney(cambnatJourneys, btn.dataset.subject);
        });
      });

    }


    export async function renderYear(year) {

      let gcseJourneys, btecJourneys, cambnatJourneys;

      let gcseButtons, btecButtons, cambnatButtons;
      let buttons, journeys;

      switch(year) {

        case 7:
          document.getElementById("ks3-button-block").replaceChildren()
          document.getElementById("ks4-qualification-button-block").replaceChildren()
          document.getElementById("ks4-gcse-button-block").replaceChildren()
          document.getElementById("ks4-btec-button-block").replaceChildren()
          document.getElementById("ks4-cambnat-button-block").replaceChildren()

          document.getElementById("title-container").innerHTML = `<h2>Key Stage 3: Year ${year}</h2>`;

          buttons = await getJSONData("./learning-journeys-data/ks3/y7-btns.json");
          populateKS3Buttons(buttons);

          journeys = await getJSONData("./learning-journeys-data/ks3/y7.json");
          hookUpKS3Buttons(journeys);
          document.querySelectorAll(".ks3-subject-btn").forEach(b => {
            if (b.dataset.subject == "art") {b.classList.add("current-btn");}
          });

          renderJourney(journeys, "art");
          break;

        case 8:
          document.getElementById("ks3-button-block").replaceChildren()
          document.getElementById("ks4-qualification-button-block").replaceChildren()
          document.getElementById("ks4-gcse-button-block").replaceChildren()
          document.getElementById("ks4-btec-button-block").replaceChildren()
          document.getElementById("ks4-cambnat-button-block").replaceChildren()

          document.getElementById("title-container").innerHTML = `<h2>Key Stage 3: Year ${year}</h2>`;

          buttons = await getJSONData("./learning-journeys-data/ks3/y8-btns.json");
          populateKS3Buttons(buttons);

          journeys = await getJSONData("./learning-journeys-data/ks3/y8.json");
          hookUpKS3Buttons(journeys);
          document.querySelectorAll(".ks3-subject-btn").forEach(b => {
            if (b.dataset.subject == "art") {b.classList.add("current-btn");}
          });

          renderJourney(journeys, "art");
          break;

        case 9:
          document.getElementById("ks3-button-block").replaceChildren()
          document.getElementById("ks4-qualification-button-block").replaceChildren()
          document.getElementById("ks4-gcse-button-block").replaceChildren()
          document.getElementById("ks4-btec-button-block").replaceChildren()
          document.getElementById("ks4-cambnat-button-block").replaceChildren()

          document.getElementById("title-container").innerHTML = `<h2>Key Stage 3: Year ${year}</h2>`;

          buttons = await getJSONData("./learning-journeys-data/ks3/y9-btns.json");
          populateKS3Buttons(buttons);

          journeys = await getJSONData("./learning-journeys-data/ks3/y9.json");
          hookUpKS3Buttons(journeys);
          document.querySelectorAll(".ks3-subject-btn").forEach(b => {
            if (b.dataset.subject == "art") {b.classList.add("current-btn");}
          });

          renderJourney(journeys, "art");
          break;

        case 10:
          document.getElementById("ks3-button-block").replaceChildren()

          document.getElementById("title-container").innerHTML = `<h2>Key Stage 4: Year ${year}</h2>`;

          buttons = {"gcse": "GCSE", "btec": "BTEC", "cambnat": "Cambridge National"}
          populateKS4QualificationButtons(buttons);

          gcseButtons = await getJSONData("./learning-journeys-data/ks4/gcse/y10-btns.json");
          btecButtons = await getJSONData("./learning-journeys-data/ks4/btec/y10-btns.json");
          cambnatButtons = await getJSONData("./learning-journeys-data/ks4/cambridge-national/y10-btns.json");
          populateKS4Buttons(gcseButtons, btecButtons, cambnatButtons);

          gcseJourneys = await getJSONData("./learning-journeys-data/ks4/gcse/y10.json");
          btecJourneys = await getJSONData("./learning-journeys-data/ks4/btec/y10.json");
          cambnatJourneys = await getJSONData("./learning-journeys-data/ks4/cambridge-national/y10.json");
          hookUpKS4(gcseJourneys, btecJourneys, cambnatJourneys);

          renderJourney(gcseJourneys, "art");
          break;

        case 11:
          document.getElementById("ks3-button-block").replaceChildren()

          document.getElementById("title-container").innerHTML = `<h2>Key Stage 4: Year ${year}</h2>`;

          buttons = {"gcse": "GCSE", "btec": "BTEC", "cambnat": "Cambridge National"}
          populateKS4QualificationButtons(buttons);

          gcseButtons = await getJSONData("./learning-journeys-data/ks4/gcse/y11-btns.json");
          btecButtons = await getJSONData("./learning-journeys-data/ks4/btec/y11-btns.json");
          cambnatButtons = await getJSONData("./learning-journeys-data/ks4/cambridge-national/y11-btns.json");
          populateKS4Buttons(gcseButtons, btecButtons, cambnatButtons);

          gcseJourneys = await getJSONData("./learning-journeys-data/ks4/gcse/y11.json");
          btecJourneys = await getJSONData("./learning-journeys-data/ks4/btec/y11.json");
          cambnatJourneys = await getJSONData("./learning-journeys-data/ks4/cambridge-national/y11.json");
          hookUpKS4(gcseJourneys, btecJourneys, cambnatJourneys);

          renderJourney(gcseJourneys, "art");
          break;

        case 12:
          buttons = await getJSONData("./learning-journeys-data/ks5/y12-btns.json");
          journeys = await getJSONData("./learning-journeys-data/ks5/y12.json");
          break;

        case 13:
          buttons = await getJSONData("./learning-journeys-data/ks5/y13-btns.json");
          journeys = await getJSONData("./learning-journeys-data/ks5/y13.json");
          break;

        default:
          console.log("no such year!");
      }

    }

  
  
