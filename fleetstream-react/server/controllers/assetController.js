const Asset = require("../models/Asset");

// GET all records or filter by query parameters (e.g. ?status=Optimal)
exports.getItems = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const assets = await Asset.find(filter);
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching records." });
  }
};

// GET a single record by path parameter (:id)
exports.getItemById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ error: "Asset record not found." });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format." });
  }
};

// POST a new record with validation
exports.createItem = async (req, res) => {
  try {
    const { assetId, sensorType, status, reading } = req.body;
    if (!assetId || !sensorType || reading === undefined) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const newAsset = new Asset({ assetId, sensorType, status, reading });
    await newAsset.save();
    res.status(201).json({ message: "Asset record created successfully!", newAsset });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Duplicate Asset ID entries are not allowed." });
    }
    res.status(500).json({ error: "Error saving record." });
  }
};

// PUT update record by ID
exports.updateItem = async (req, res) => {
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedAsset) return res.status(404).json({ error: "Asset not found for update." });
    res.json({ message: "Asset updated successfully!", updatedAsset });
  } catch (err) {
    res.status(400).json({ error: "Validation error during update." });
  }
};

// DELETE record by ID
exports.deleteItem = async (req, res) => {
  try {
    const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
    if (!deletedAsset) return res.status(404).json({ error: "Asset not found for deletion." });
    res.json({ message: "Asset deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting record." });
  }
};