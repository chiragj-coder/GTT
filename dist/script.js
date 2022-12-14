const teachers = [
  {
    name: "Roma Ma'am",
    url: "/GTT/dist/img/rgb/BRR_MAAM.png",
    share_url: "https://imgur.com/yYhN5Yd",
    silhouette_url: "/GTT/dist/img/bw/BRR_MAAM.jpeg",
    silhouette_share_url: "https://imgur.com/V6WRZ4I",
    comment: `<div><p><span id="author">Brock</span>:</p><p>A strange seed was planted on its back at birth. The plant sprouts and grows with this teacher.</p></div>`,
  },
  {
    name: "Ankesh Sir",
    url: "/GTT/dist/img/rgb/PAP_SIR.png",
    share_url: "RGB",
    silhouette_url: "/GTT/dist/img/bw/PAP_SIR.png",
    silhouette_share_url: "",
    comment: `<div><p><span id="author">Chirag</span>:</p><p>Be Careful. You will fall in love with physics...</p></div>`,
  },
  {
    name: "Nirmal Sir",
    url: "/GTT/dist/img/rgb/MNH_SIR.png",
    share_url: "https://imgur.com/b51DzFD",
    silhouette_url: "/GTT/dist/img/bw/MNH_SIR.jpeg",
    silhouette_share_url: "",
    comment: `<div><p><span id="author">James</span>:</p><p>Stop right there!</p><p>That teacher is Team Rocket's! Surrender now, or prepare to fight!</p></div>`,
  },
  {
    name: "Aalekh Sir",
    url: "/GTT/dist/img/rgb/SAR_SIR.png",
    share_url: "https://imgur.com/yYhN5Yd",
    silhouette_url: "/GTT/dist/img/bw/SAR_SIR.jpeg",
    silhouette_share_url: "",
    comment: `<div><p><span id="author">Brock</span>:</p><p>A strange seed was planted on its back at birth. The plant sprouts and grows with this teacher.</p></div>`,
  },
  {
    name: "Amit Sir",
    url: "/GTT/dist/img/rgb/CAH_SIR.png",
    share_url: "https://imgur.com/yYhN5Yd",
    silhouette_url: "/GTT/dist/img/bw/CAH_SIR.jpeg",
    silhouette_share_url: "",
    comment: `<div><p><span id="author">Brock</span>:</p><p>A strange seed was planted on its back at birth. The plant sprouts and grows with this teacher.</p></div>`,
  },
];

const randomPick = array => array[Math.floor(Math.random() * array.length)];

$(document).ready(function () {

  const setImageLink = (a => url => a.attr("href", url))($("#teacher"));
  const setImage = (i => url => i.attr("src", url))($("#teacher img"));
  const setMsg = (div => text => div.html(text))($("#text"));
  const msg = `<div><h1>Guess The Teacher</h1></div>`;
  const docRoot = $(":root");
  const skip = $("#new-quote");
  const submit = $("#answer button");
  const answerInput = $("#answer input");
  const reloadBtn = $("#reload");

  function load (teacher) {
    setImageLink(teacher.silhouette_share_url);
    setImage(teacher.silhouette_url);

    setMsg(msg);
    docRoot.css("--links-visibility", "visible");
    docRoot.css("--display-reload-btn", "none");
    docRoot.css("--display-other-form-btns", "block");
    answerInput.focus();
  }

  let teacher = randomPick(teachers);
  load(teacher);

  skip.click(function () {
    let newteacher;
    if (teachers.length < 2) {
      setMsg("<p>Sorry, this is the last one in my list</p>");
      setTimeout(function () { setMsg(msg); }, 2000);
      return
    }
    do {
      newteacher = randomPick(teachers);
    } while (newteacher === teacher);
    teacher = newteacher;
    load(teacher);
  });

  submit.click(function () {
    let answerText = answerInput.val();
    if (answerText == "") return;
    answerText = answerText.trim().replace(/\s+/g, " ").toLowerCase();
    if (answerText == teacher.name.toLowerCase()) {
      setMsg(`<h1>Correct!</h1><p>It's <em>${teacher.name}</em>.`);
      docRoot.css("--display-reload-btn", "block");
      docRoot.css("--display-other-form-btns", "none");
      setImageLink(teacher.share_url);
      setImage(teacher.url);
      reloadBtn.focus();
    } else {
      setMsg("<p>Nope, is not that one</p>");
      answerInput.val("");
      setTimeout(function () { setMsg(msg); }, 2000);
    }
  });
  answerInput.keypress(function (event) {
    if (event.which == 13) {
      // submit.click();
    }
  })

  reloadBtn.click(function () {
    for (let i = 0, n = teachers.length; i < n; i++) {
      if (teacher === teachers[i]) {
        teachers.splice(i, 1);
        if (teachers.length == 0) {
          setMsg(`<h1>The End</h1><p>That was the last one</p>`);
          docRoot.css("--display-reload-btn", "none");
        } else {
          answerInput.val("");
          teacher = randomPick(teachers);
          load(teacher);
        }
        return
      }
    }
  });
});