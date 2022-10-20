const teachers = [
  {
    name: "Ankesh Sir",
    url: "/dist/img/rgb/PAP_SIR.png",
    share_url: "RGB",
    silhouette_url: "/dist/img/bw/PAP_SIR.png",
    silhouette_share_url: "WB",
    comment: `<div><p><span id="author">Chirag</span>:</p><p>You will fall in love with physics...</p></div>`,
  },
  {
    name: "Nirmal Sir",
    url: "/dist/img/rgb/MNH_SIR.png",
    share_url: "https://imgur.com/b51DzFD",
    silhouette_url: "/dist/img/bw/MNH_SIR.png",
    silhouette_share_url: "https://imgur.com/n86AP05",
    comment: `<div><p><span id="author">James</span>:</p><p>Stop right there!</p><p>That teacher is Team Rocket's! Surrender now, or prepare to fight!</p></div>`,
  },
  // {
  //   name: "Bulbasaur",
  //   url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077496/teacher-app/bulbasaur.png",
  //   share_url: "https://imgur.com/yYhN5Yd",
  //   silhouette_url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077496/teacher-app/bulbasaur-silhouette.png",
  //   silhouette_share_url: "https://imgur.com/V6WRZ4I",
  //   comment: `<div><p><span id="author">Brock</span>:</p><p>A strange seed was planted on its back at birth. The plant sprouts and grows with this teacher.</p></div>`,
  // },
  // {
  //   name: "Squirtle",
  //   url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077502/teacher-app/squirtle.png",
  //   share_url: "https://imgur.com/ekXbvX2",
  //   silhouette_url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077501/teacher-app/squirtle-silhouette.png",
  //   silhouette_share_url: "https://imgur.com/VPeNAtG",
  //   comment: `<div><p><span id="author">Misty</span>:</p><p>Oh! is so cute.</p><p>Water teachers are the best.</p></div>`,
  // },
  // {
  //   name: "Charmander",
  //   url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077498/teacher-app/charmander.png",
  //   share_url: "https://imgur.com/LS1p1LE",
  //   silhouette_url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077495/teacher-app/charmander-silhouette.png",
  //   silhouette_share_url: "https://imgur.com/W3Kx9Tx",
  //   comment: `<div><p><span id="author">Ash</span>:</p><p>This one prefers hot places. When it rains, steam is said to spout from the tip of its tail.</p></div>`,
  // },
];

const randomPick = array => array[Math.floor(Math.random() * array.length)];

$(document).ready(function () {

  // const setTwitterLink = (t => url => {
  //   t.attr("href", `https://twitter.com/intent/tweet?text=${url}`);
  // })($("#tweet-quote"));

  // const setFacebookLink = (f => url => {
  //   f.attr("href", `https://www.facebook.com/sharer/sharer.php?u=${url}`);
  // })($("#facebook-link"));

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
    // setTwitterLink(teacher.silhouette_share_url);
    // setFacebookLink(teacher.silhouette_share_url);
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
      // setTwitterLink(teacher.share_url);
      // setFacebookLink(teacher.share_url);
      reloadBtn.focus();
    } else {
      setMsg("<p>Nope, is not that one</p>");
      answerInput.val("");
      setTimeout(function () { setMsg(msg); }, 2000);
    }
  });
  answerInput.keypress(function (event) {
    if (event.which == 13) {
      submit.click();
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