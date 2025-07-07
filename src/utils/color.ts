
const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "flagged":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return "✓";
      case "pending":
        return "⏳";
      case "flagged":
        return "⚠️";
      default:
        return "•";
    }
  };

  const getProductCategory = (category: any) => {
  
    if (category["electronics"]) {
      return "Electronics";
    } else if (category["automotive"]) {
      return "Automotive";
    } else if (category["pharmaceuticals"]) {
      return "Pharmaceuticals";
    } else if (category["food"]) {
      return "Food";
    } else if (category["textiles"]) {
      return "Textiles";
    } else if (category["luxury"]) {
      return "Luxury";
    } else if (category["industrial"]) {
      return "Industrial";
    } else {
      return "Other";
    }
  };


  export { getStatusColor, getStatusIcon, getProductCategory };