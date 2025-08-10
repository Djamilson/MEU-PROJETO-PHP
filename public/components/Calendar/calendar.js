document.addEventListener("DOMContentLoaded", function () {
  const calendars = document.querySelectorAll(".custom-calendar");

  calendars.forEach(calendar => {
    const input = calendar.querySelector(".date-picker-input");
    const icon = calendar.querySelector(".calendar-icon");
    const popup = calendar.querySelector(".calendar-popup");
    const daysContainer = calendar.querySelector(".calendar-days");
    const monthSelect = calendar.querySelector(".calendar-month");
    const yearSelect = calendar.querySelector(".calendar-year");
    const prevBtn = calendar.querySelector(".prev-month");
    const nextBtn = calendar.querySelector(".next-month");

    // idioma (default inglês se não definido)
    const lang = calendar.dataset.lang || "en-US";

    const monthNames = {
      "pt-BR": ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
      "en-US": ["January","February","March","April","May","June","July","August","September","October","November","December"]
    };
    const weekDays = {
      "pt-BR": ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
      "en-US": ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    };

    // Renderiza cabeçalho das siglas de dia
    const weekdaysHeader = calendar.querySelector(".calendar-weekdays");
    weekdaysHeader.innerHTML = weekDays[lang].map(d => `<div>${d}</div>`).join("");

    // Datas iniciais
    let currentDate = new Date();

    // Popula month/years
    function populateMonthSelect(){
      monthSelect.innerHTML = monthNames[lang].map((m,i)=> `<option value="${i}">${m}</option>`).join("");
    }
    function populateYearSelect(){
      const now = new Date().getFullYear();
      let out = "";
      for(let y = now - 100; y <= now + 20; y++){
        out += `<option value="${y}">${y}</option>`;
      }
      yearSelect.innerHTML = out;
    }

    // Render do calendar
    function renderCalendar(date){
      daysContainer.innerHTML = "";
      const year = date.getFullYear();
      const month = date.getMonth();

      // atualizar selects
      monthSelect.value = month;
      yearSelect.value = year;

      // primeiro dia info
      const firstDay = new Date(year, month, 1).getDay(); // 0 = Domingo
      const lastDate = new Date(year, month+1, 0).getDate();

      // espaços vazios (ajusta para começo da semana como domingo)
      const blanks = firstDay; // se quiser começar em segunda, ajuste aqui
      for(let i=0;i<blanks;i++){
        daysContainer.innerHTML += `<div></div>`;
      }

      for(let d=1; d<=lastDate; d++){
        const el = document.createElement("div");
        el.textContent = d;
        el.setAttribute("role","button");
        el.addEventListener("click", function(e){
          e.preventDefault();
          // formata de acordo com idioma
          if(lang === "pt-BR"){
            input.value = `${String(d).padStart(2,"0")}/${String(month+1).padStart(2,"0")}/${year}`;
          } else {
            input.value = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
          }
          // marca selecionado
          Array.from(daysContainer.children).forEach(ch => ch.classList.remove("selected"));
          el.classList.add("selected");
          popup.style.display = "none";
        });
        daysContainer.appendChild(el);
      }
    }

    // Prev / Next: PREVENIR submissão do form
    prevBtn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });
    nextBtn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });

    // quando muda selects (mês/ano)
    monthSelect.addEventListener("change", function(){
      const m = parseInt(this.value,10);
      currentDate.setMonth(m);
      renderCalendar(currentDate);
    });
    yearSelect.addEventListener("change", function(){
      const y = parseInt(this.value,10);
      currentDate.setFullYear(y);
      renderCalendar(currentDate);
    });

    // abrir/fechar popup (icon e input)
    function openPopup(){
      popup.style.display = "block";
      renderCalendar(currentDate);
    }
    function closePopup(){
      popup.style.display = "none";
    }

    icon.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      popup.style.display = (popup.style.display === "block") ? "none" : "block";
      renderCalendar(currentDate);
    });

    input.addEventListener("focus", function(e){
      // não prevenir focos normais: só abrir o calendário
      popup.style.display = "block";
      renderCalendar(currentDate);
    });

    // se o usuário digitar no input: tenta parsear e atualizar o calendário
    input.addEventListener("input", function(){
      const val = input.value.trim();
      if(lang === "pt-BR"){
        // dd/mm/yyyy
        const m = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if(m){
          currentDate = new Date(parseInt(m[3],10), parseInt(m[2],10)-1, parseInt(m[1],10));
          renderCalendar(currentDate);
        }
      } else {
        // yyyy-mm-dd
        const m = val.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if(m){
          currentDate = new Date(parseInt(m[1],10), parseInt(m[2],10)-1, parseInt(m[3],10));
          renderCalendar(currentDate);
        }
      }
    });

    // fechar ao clicar fora
    document.addEventListener("click", function(e){
      if(!calendar.contains(e.target)){
        closePopup();
      }
    });

    // inicializar
    populateMonthSelect();
    populateYearSelect();
    renderCalendar(currentDate);
  }); // fim foreach
}); // fim DOMContentLoaded