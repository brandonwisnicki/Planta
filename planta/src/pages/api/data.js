// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


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
      color: "#2400FF"
    },
    {
      id: 3,
      name: "Apple",
      color: "#FF0000"
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
    }
  ]

  

  res.status(200).json(data)
}