export const mockNews = [
  {
    title: "New Container Terminal Opens at Jebel Ali Port",
    url: "https://www.reuters.com/business/",
    time: new Date().toISOString(),
    source: {
      title: "Reuters",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "MARITIME",
  },
  {
    title: "Suez Canal Authority Announces New Transit Fees for 2023",
    url: "https://www.bloomberg.com/markets/commodities/shipping",
    time: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    source: {
      title: "Bloomberg",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "SHIPPING",
  },
  {
    title: "Global Container Shortage Impacts Middle East Trade Routes",
    url: "https://www.cnbc.com/world/?region=world",
    time: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    source: {
      title: "CNBC",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "LOGISTICS",
  },
  {
    title: "Egyptian Ports See Increased Traffic Following New Trade Agreements",
    url: "https://english.alarabiya.net/business",
    time: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    source: {
      title: "Al Arabiya",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "PORTS",
  },
  {
    title: "New Maritime Route Connects GCC Countries to East Africa",
    url: "https://www.aljazeera.com/economy/",
    time: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    source: {
      title: "Al Jazeera",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "SHIPPING",
  },
  {
    title: "Saudi Arabia Invests in New Fleet of LNG Carriers",
    url: "https://www.cnn.com/business/energy",
    time: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
    source: {
      title: "CNN Business",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "ENERGY",
  },
  {
    title: "UAE Announces New Maritime Strategy for 2030",
    url: "https://www.ft.com/companies/transport",
    time: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
    source: {
      title: "Financial Times",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "MARITIME",
  },
  {
    title: "China-Middle East Shipping Corridor Sees Record Volume",
    url: "https://www.maritime-executive.com/",
    time: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
    source: {
      title: "Maritime Executive",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "TRADE",
  },
  {
    title: "Port of Fujairah Expands Capacity to Meet Growing Demand",
    url: "https://lloydslist.maritimeintelligence.informa.com/",
    time: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
    source: {
      title: "Lloyd's List",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "PORTS",
  },
  {
    title: "IMO Introduces New Regulations for Maritime Emissions",
    url: "https://splash247.com/",
    time: new Date(Date.now() - 777600000).toISOString(), // 9 days ago
    source: {
      title: "Splash 247",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "REGULATION",
  },
  {
    title: "Red Sea Security Concerns Impact Global Shipping Routes",
    url: "https://www.tradewindsnews.com/",
    time: new Date(Date.now() - 864000000).toISOString(), // 10 days ago
    source: {
      title: "TradeWinds",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "SECURITY",
  },
  {
    title: "Maersk and MSC End 2M Alliance, Reshaping Container Shipping",
    url: "https://www.seatrade-maritime.com/",
    time: new Date(Date.now() - 950400000).toISOString(), // 11 days ago
    source: {
      title: "Seatrade Maritime",
    },
    image: "/placeholder.svg?height=400&width=300",
    category: "SHIPPING",
  },
]
