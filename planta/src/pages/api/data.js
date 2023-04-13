// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

export default function handler(req, res) {

  const data = {}

  data["plants"] = [
    {
      id: 0,
      name: "Empty",
      color: "#FFFFFF"
    },
  
    {
      id: 1,
      name: "Rose",
      color: "#FF9797"
    },
    {
      id: 2,
      name: "Tulip",
      color: "#007FFF"
    },
    {
      id: 3,
      name: "Apple",
      color: "#FF2E2E"
    },
    {
      id: 4,
      name: "Carrot",
      color: "#FF7A00"
    },
    {
      id: 5,
      name: "Pepper",
      color: "#287E00"
    },
    {
      id: 6,
      name: "Lemon",
      color: "#FFE900"
    },
    {
      id: 7,
      name: "Path",
      color: "#727272"
    },
    {
      id: 8,
      name: "Sunflower",
      color: "#f7ca00"
    },
    {
      id: 9,
      name: "Cactus",
      color: "#b1cc33"
    },
    {
      id: 10,
      name: "Pond",
      color: "#0000FF"
    }
  ]

  res.status(200).json(data)
}