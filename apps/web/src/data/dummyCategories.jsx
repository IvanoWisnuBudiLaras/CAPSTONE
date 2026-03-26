export const categoryTypes = {
  ALLOCATION: 'allocation',    // Alokasi budget
  INCOME: 'income',          // Pemasukan
  EXPENSE: 'expense'         // Pengeluaran umum
};

export const typeLabels = {
  [categoryTypes.ALLOCATION]: { label: 'Alokasi', color: '#00bfa5', badge: 'bg-[#00bfa5]' },
  [categoryTypes.INCOME]: { label: 'Pemasukan', color: '#448aff', badge: 'bg-[#448aff]' },
  [categoryTypes.EXPENSE]: { label: 'Pengeluaran', color: '#ff5252', badge: 'bg-[#ff5252]' }
};

export const dummyCategories = [
  {
    id: 1,
    name: "Makanan",
    icon: "🍔",
    color: "#ff6b6b",
    type: categoryTypes.ALLOCATION,
    isDefault: true
  },
  {
    id: 2,
    name: "Transportasi",
    icon: "🚗",
    color: "#4ecdc4",
    type: categoryTypes.ALLOCATION,
    isDefault: true
  },
  {
    id: 3,
    name: "Belanja",
    icon: "🛍️",
    color: "#45b7d1",
    type: categoryTypes.ALLOCATION,
    isDefault: false
  },
  {
    id: 4,
    name: "Hiburan",
    icon: "🎬",
    color: "#f9ca24",
    type: categoryTypes.ALLOCATION,
    isDefault: false
  },
  {
    id: 5,
    name: "Gaji",
    icon: "💰",
    color: "#00b894",
    type: categoryTypes.INCOME,
    isDefault: true
  },
  {
    id: 6,
    name: "Investasi",
    icon: "📈",
    color: "#6c5ce7",
    type: categoryTypes.INCOME,
    isDefault: false
  },
  {
    id: 7,
    name: "Lainnya",
    icon: "📦",
    color: "#b2bec3",
    type: categoryTypes.EXPENSE,
    isDefault: true
  }
];

export const availableIcons = [
  "🍔", "🚗", "🛍️", "🎬", "⚕️", "📚", "💰", "📈", "🏠", "💡",
  "📱", "💻", "✈️", "🎮", "🎵", "🎨", "🎁", "📝", "🔧", "🧹",
  "👕", "👟", "💄", "🧴", "🐶", "🌱", "⚽", "🚲", "🛏️", "🚿",
  "📦", "🏥", "🎓", "🚕", "🛒", "☕", "🍕", "🥦", "🥤", "🍰"
];

export const availableColors = [
  "#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#6c5ce7",
  "#00b894", "#ff7675", "#74b9ff", "#fd79a8", "#fdcb6e",
  "#e17055", "#00bfa5", "#448aff", "#ff5252", "#b2bec3",
  "#2d3436", "#a29bfe", "#dfe6e9", "#636e72", "#2ecc71"
];