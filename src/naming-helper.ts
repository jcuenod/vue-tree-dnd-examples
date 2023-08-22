const adjectives = [
  "Adorable",
  "Beautiful",
  "Clean",
  "Drab",
  "Elegant",
  "Fancy",
  "Glamorous",
  "Handsome",
  "Magnificent",
  "Old-fashioned",
  "Plain",
  "Quaint",
  "Sparkling",
  "Ugliest",
  "Unsightly",
  "Angry",
  "Bewildered",
  "Clumsy",
  "Defeated",
  "Embarrassed",
  "Fierce",
  "Magical",
  "Grumpy",
  "Helpless",
  "Itchy",
  "Jealous",
  "Lazy",
  "Mysterious",
  "Nervous",
  "Obnoxious",
  "Panicky",
  "Repulsive",
  "Scary",
  "Thoughtless",
  "Uptight",
  "Worried",
];

const animates = [
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
  "Cat",
  "Fish",
  "Chicken",
  "Cow",
  "Mouse",
  "Sheep",
  "Ant",
  "Bat",
  "Bear",
  "Bee",
  "Bird",
  "Camel",
  "Elephant",
  "Kangaroo",
  "Unicorn",
  "Dinosaur",
  "Dolphin",
  "Duck",
  "Lion",
];

export const getRandomName = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animate = animates[Math.floor(Math.random() * animates.length)];
  return `${adjective} ${animate}`;
};
