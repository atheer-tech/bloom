const flowers = [
  {
    name: "Rose",
    scientific: "Rosa",
    category: "Outdoor",
    environment: "Outdoor",
    origin: "Asia, Europe & North America",
    meaning: "Love and appreciation",
    season: "Spring to autumn",
    description: "One of the world's best-known flowers, roses come in thousands of varieties and colors.",
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
    facts: ["Roses belong to the Rosaceae family.", "There are thousands of cultivated varieties.", "Rose hips can be used to make tea and other foods."]
  },
  {
    name: "Tulip",
    scientific: "Tulipa",
    category: "Outdoor",
    environment: "Outdoor",
    origin: "Central Asia",
    meaning: "Perfect love",
    season: "Spring",
    description: "Tulips are famous for their simple cup-shaped blooms and huge range of colors.",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=900&q=80",
    facts: ["Tulips were cultivated in the Ottoman Empire.", "There are thousands of tulip varieties.", "Tulips grow from bulbs."]
  },
  {
    name: "Sunflower",
    scientific: "Helianthus annuus",
    category: "Outdoor",
    environment: "Outdoor",
    origin: "North America",
    meaning: "Joy and optimism",
    season: "Summer",
    description: "Bright and cheerful, sunflowers are known for their large flower heads and edible seeds.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Radiant_sunflowers_%28Unsplash%29.jpg/960px-Radiant_sunflowers_%28Unsplash%29.jpg",
    facts: ["Sunflowers can grow several meters tall.", "Their seeds are an important food crop.", "Young sunflower heads track the sun during the day."]
  },
  {
    name: "Hibiscus",
    scientific: "Hibiscus rosa-sinensis",
    category: "Tropical",
    environment: "Tropical",
    origin: "East Asia",
    meaning: "Beauty and delicate charm",
    season: "Warm seasons",
    description: "Hibiscus flowers have large, colorful petals and thrive in warm climates.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    facts: ["Hibiscus is associated with tropical and subtropical regions.", "Some hibiscus species are used in herbal teas.", "Flowers can attract butterflies and hummingbirds."]
  },
  {
    name: "Peace Lily",
    scientific: "Spathiphyllum",
    category: "Indoor",
    environment: "Indoor",
    origin: "Tropical Americas",
    meaning: "Peace and tranquility",
    season: "Year-round indoors",
    description: "A popular houseplant with glossy leaves and elegant white flower-like spathes.",
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Peace_lily_-_2.jpg/960px-Peace_lily_-_2.jpg",
    facts: ["Peace lilies prefer indirect light.", "The white part is technically a spathe, not a petal.", "They naturally grow in tropical forest environments."]
  },
  {
    name: "Lavender",
    scientific: "Lavandula",
    category: "Outdoor",
    environment: "Outdoor",
    origin: "Mediterranean region",
    meaning: "Calm and devotion",
    season: "Summer",
    description: "Lavender is loved for its purple flower spikes and distinctive fragrance.",
    image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=80",
    facts: ["Lavender is part of the mint family.", "Its fragrance comes from aromatic oils.", "Bees are strongly attracted to lavender flowers."]
  },
  {
    name: "Aloe Vera",
    scientific: "Aloe vera",
    category: "Desert",
    environment: "Desert",
    origin: "Arabian Peninsula",
    meaning: "Healing and protection",
    season: "Warm seasons",
    description: "A hardy succulent adapted to dry climates, recognized by its fleshy, pointed leaves.",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=80",
    facts: ["Aloe vera stores water in its leaves.", "It is adapted to dry environments.", "It can grow well in containers with well-draining soil."]
  },
  {
    name: "Cherry Blossom",
    scientific: "Prunus serrulata",
    category: "Outdoor",
    environment: "Outdoor",
    origin: "East Asia",
    meaning: "Renewal and the beauty of life",
    season: "Spring",
    description: "Delicate blossoms that create spectacular displays when cherry trees bloom in spring.",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=900&q=80",
    facts: ["Cherry blossom season is celebrated in many countries.", "Individual flowers often last only a short time.", "The blossoms are closely associated with spring in Japan."]
  }
];

const grid = document.getElementById("flowerGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
let currentFilter = "All";

function renderFlowers() {
  const search = searchInput.value.toLowerCase().trim();

  const filtered = flowers.filter(flower => {
    const matchesFilter = currentFilter === "All" || flower.category === currentFilter || flower.environment === currentFilter;
    const matchesSearch =
      flower.name.toLowerCase().includes(search) ||
      flower.scientific.toLowerCase().includes(search) ||
      flower.origin.toLowerCase().includes(search) ||
      flower.meaning.toLowerCase().includes(search);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = filtered.map((flower, index) => `
    <article class="flower-card" data-name="${flower.name}" tabindex="0">
      <img src="${flower.image}" alt="${flower.name}">
      <div class="card-body">
        <span class="tag">${flower.category}</span>
        <h3>${flower.name}</h3>
        <p class="scientific">${flower.scientific}</p>
        <p>${flower.meaning}</p>
      </div>
    </article>
  `).join("");

  noResults.style.display = filtered.length ? "none" : "block";

  document.querySelectorAll(".flower-card").forEach(card => {
    card.addEventListener("click", () => openFlower(card.dataset.name));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter") openFlower(card.dataset.name);
    });
  });
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderFlowers();
  });
});

searchInput.addEventListener("input", renderFlowers);

const modal = document.getElementById("flowerModal");

function openFlower(name) {
  const flower = flowers.find(f => f.name === name);
  if (!flower) return;

  document.getElementById("modalImage").src = flower.image;
  document.getElementById("modalImage").alt = flower.name;
  document.getElementById("modalCategory").textContent = flower.category;
  document.getElementById("modalName").textContent = flower.name;
  document.getElementById("modalScientific").textContent = flower.scientific;
  document.getElementById("modalDescription").textContent = flower.description;
  document.getElementById("modalOrigin").textContent = flower.origin;
  document.getElementById("modalMeaning").textContent = flower.meaning;
  document.getElementById("modalSeason").textContent = flower.season;
  document.getElementById("modalEnvironment").textContent = flower.environment;
  document.getElementById("modalFacts").innerHTML = flower.facts.map(f => `<li>${f}</li>`).join("");

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

renderFlowers();

/* ---------------- Flower Personality Quiz ---------------- */

const questions = [
  {
    text: "Which environment sounds most relaxing?",
    answers: [
      ["A sunny garden", "sunflower"],
      ["A quiet room", "peace"],
      ["A warm tropical beach", "hibiscus"],
      ["A peaceful Mediterranean field", "lavender"]
    ]
  },
  {
    text: "Pick a color you would choose most often.",
    answers: [
      ["Bright yellow", "sunflower"],
      ["Soft white", "peace"],
      ["Purple", "lavender"],
      ["Pink or red", "rose"]
    ]
  },
  {
    text: "How would your friends describe you?",
    answers: [
      ["Cheerful", "sunflower"],
      ["Calm", "peace"],
      ["Adventurous", "hibiscus"],
      ["Thoughtful", "lavender"]
    ]
  },
  {
    text: "Choose a perfect weekend activity.",
    answers: [
      ["Exploring somewhere new", "hibiscus"],
      ["Reading or relaxing", "peace"],
      ["Spending time with friends", "rose"],
      ["Going outside", "sunflower"]
    ]
  },
  {
    text: "Which quality matters most to you?",
    answers: [
      ["Kindness", "rose"],
      ["Peace", "peace"],
      ["Confidence", "sunflower"],
      ["Creativity", "lavender"]
    ]
  }
];

const results = {
  sunflower: {
    name: "Sunflower",
    emoji: "🌻",
    description: "You are warm, positive, and naturally bring energy into the spaces around you."
  },
  peace: {
    name: "Peace Lily",
    emoji: "🪷",
    description: "You value calm surroundings, thoughtful moments, and creating harmony with others."
  },
  hibiscus: {
    name: "Hibiscus",
    emoji: "🌺",
    description: "You are curious, expressive, and drawn toward new experiences and vibrant places."
  },
  lavender: {
    name: "Lavender",
    emoji: "💜",
    description: "You are thoughtful and creative, with an appreciation for peaceful and beautiful details."
  },
  rose: {
    name: "Rose",
    emoji: "🌹",
    description: "You value meaningful connections and show care and appreciation for the people around you."
  }
};

let questionIndex = 0;
let scores = {};

const quizIntro = document.getElementById("quizIntro");
const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");

document.getElementById("startQuiz").addEventListener("click", startQuiz);
document.getElementById("restartQuiz").addEventListener("click", startQuiz);

function startQuiz() {
  questionIndex = 0;
  scores = {};
  quizIntro.classList.add("hidden");
  quizResult.classList.add("hidden");
  quizContent.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const question = questions[questionIndex];
  document.getElementById("questionNumber").textContent =
    `Question ${questionIndex + 1} of ${questions.length}`;
  document.getElementById("progress").style.width =
    `${((questionIndex + 1) / questions.length) * 100}%`;
  document.getElementById("questionText").textContent = question.text;

  document.getElementById("answers").innerHTML = question.answers.map(([text, type]) =>
    `<button class="answer" data-type="${type}">${text}</button>`
  ).join("");

  document.querySelectorAll(".answer").forEach(button => {
    button.addEventListener("click", () => chooseAnswer(button.dataset.type));
  });
}

function chooseAnswer(type) {
  scores[type] = (scores[type] || 0) + 1;
  questionIndex++;

  if (questionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const result = results[winner];

  quizContent.classList.add("hidden");
  quizResult.classList.remove("hidden");

  document.getElementById("resultEmoji").textContent = result.emoji;
  document.getElementById("resultName").textContent = result.name;
  document.getElementById("resultDescription").textContent = result.description;
}
