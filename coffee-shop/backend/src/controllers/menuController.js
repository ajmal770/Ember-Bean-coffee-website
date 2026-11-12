import { menuItems, categories } from "../data/menuData.js";

export const getAllMenu = (req, res) => {
  try {
    const { search, bestseller } = req.query;
    let filtered = [...menuItems];

    if (search) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    if (bestseller === "true") {
      filtered = filtered.filter(item => item.bestseller);
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      categories,
      data: filtered
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching menu data",
      error: error.message
    });
  }
};

export const getMenuByCategory = (req, res) => {
  try {
    const { category } = req.params;
    const targetSlug = category.toLowerCase().trim();

    const filtered = menuItems.filter(
      item =>
        item.categorySlug.toLowerCase() === targetSlug ||
        item.category.toLowerCase() === targetSlug
    );

    if (filtered.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No products found for category '${category}'`,
        availableCategories: categories.map(c => c.slug)
      });
    }

    return res.status(200).json({
      success: true,
      category,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error fetching category menu",
      error: error.message
    });
  }
};

