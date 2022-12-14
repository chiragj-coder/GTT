const pokemons = [
  {
    name: "Pikachu",
    url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077498/pokemon-app/pikachu.png",
    share_url: "https://imgur.com/b51DzFD",
    silhouette_url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077496/pokemon-app/pikachu-silhouette.png",
    silhouette_share_url: "https://imgur.com/n86AP05",
    comment: `<div><p><span id="author">James</span>:</p><p>Stop right there!</p><p>That pokemon is Team Rocket's! Surrender now, or prepare to fight!</p></div>`,
  },
  {
    name: "Bulbasaur",
    url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077496/pokemon-app/bulbasaur.png",
    share_url: "https://imgur.com/yYhN5Yd",
    silhouette_url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077496/pokemon-app/bulbasaur-silhouette.png",
    silhouette_share_url: "https://imgur.com/V6WRZ4I",
    comment: `<div><p><span id="author">Brock</span>:</p><p>A strange seed was planted on its back at birth. The plant sprouts and grows with this pokemon.</p></div>`,
  },
  {
    name: "Squirtle",
    url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077502/pokemon-app/squirtle.png",
    share_url: "https://imgur.com/ekXbvX2",
    silhouette_url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077501/pokemon-app/squirtle-silhouette.png",
    silhouette_share_url: "https://imgur.com/VPeNAtG",
    comment: `<div><p><span id="author">Misty</span>:</p><p>Oh! is so cute.</p><p>Water pokemons are the best.</p></div>`,
  },
  {
    name: "Charmander",
    url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077498/pokemon-app/charmander.png",
    share_url: "https://imgur.com/LS1p1LE",
    silhouette_url: "https://res.cloudinary.com/dl62zkqkq/image/upload/v1536077495/pokemon-app/charmander-silhouette.png",
    silhouette_share_url: "https://imgur.com/W3Kx9Tx",
    comment: `<div><p><span id="author">Ash</span>:</p><p>This one prefers hot places. When it rains, steam is said to spout from the tip of its tail.</p></div>`,
  },
];

const randomPick = array => array[Math.floor(Math.random() * array.length)];

$(document).ready(function () {

  const setTwitterLink = (t => url => {
    t.attr("href", `https://twitter.com/intent/tweet?text=${url}`);
  })($("#tweet-quote"));

  const setFacebookLink = (f => url => {
    f.attr("href", `https://www.facebook.com/sharer/sharer.php?u=${url}`);
  })($("#facebook-link"));

  const setImageLink = (a => url => a.attr("href", url))($("#pokemon"));
  const setImage = (i => url => i.attr("src", url))($("#pokemon img"));
  const setMsg = (div => text => div.html(text))($("#text"));
  const msg = `<div><h1>Who is that Pokemon?</h1></div>`;
  const docRoot = $(":root");
  const skip = $("#new-quote");
  const submit = $("#answer button");
  const answerInput = $("#answer input");
  const reloadBtn = $("#reload");

  function load (pokemon) {
    setImageLink(pokemon.silhouette_share_url);
    setImage(pokemon.silhouette_url);
    setTwitterLink(pokemon.silhouette_share_url);
    setFacebookLink(pokemon.silhouette_share_url);
    setMsg(msg);
    docRoot.css("--links-visibility", "visible");
    docRoot.css("--display-reload-btn", "none");
    docRoot.css("--display-other-form-btns", "block");
    answerInput.focus();
  }

  let pokemon = randomPick(pokemons);
  load(pokemon);

  skip.click(function () {
    let newPokemon;
    if (pokemons.length < 2) {
      setMsg("<p>Sorry, this is the last one in my list</p>");
      setTimeout(function () { setMsg(msg); }, 2000);
      return
    }
    do {
      newPokemon = randomPick(pokemons);
    } while (newPokemon === pokemon);
    pokemon = newPokemon;
    load(pokemon);
  });

  submit.click(function () {
    let answerText = answerInput.val();
    if (answerText == "") return;
    answerText = answerText.trim().replace(/\s+/g, " ").toLowerCase();
    if (answerText == pokemon.name.toLowerCase()) {
      setMsg(`<h1>Correct!</h1><p>It's <em>${pokemon.name}</em>.`);
      docRoot.css("--display-reload-btn", "block");
      docRoot.css("--display-other-form-btns", "none");
      setImageLink(pokemon.share_url);
      setImage(pokemon.url);
      setTwitterLink(pokemon.share_url);
      setFacebookLink(pokemon.share_url);
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
    for (let i = 0, n = pokemons.length; i < n; i++) {
      if (pokemon === pokemons[i]) {
        pokemons.splice(i, 1);
        if (pokemons.length == 0) {
          setMsg(`<h1>The End</h1><p>That was the last one</p><p> Now go catch them all</p>`);
          docRoot.css("--display-reload-btn", "none");
        } else {
          answerInput.val("");
          pokemon = randomPick(pokemons);
          load(pokemon);
        }
        return
      }
    }
  });
});