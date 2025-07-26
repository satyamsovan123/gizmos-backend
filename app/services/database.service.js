class DatabaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const record = await this.model.create(data);
      return record;
    } catch (error) {
      throw new Error(`Error creating record: ${error.message}`);
    }
  }

  async findAll(query = {}) {
    try {
      const records = await this.model.find(query).lean();
      return records;
    } catch (error) {
      throw new Error(`Error fetching records: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const record = await this.model.findById(id).lean();
      if (!record) {
        throw new Error("Record not found");
      }
      return record;
    } catch (error) {
      throw new Error(`Error fetching record by ID: ${error.message}`);
    }
  }

  async updateById(id, data) {
    try {
      const record = await this.model.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!record) {
        throw new Error(`Record with ID ${id} not found`);
      }
      return record;
    } catch (error) {
      throw new Error(`Error updating record: ${error.message}`);
    }
  }

  async deleteById(id) {
    try {
      const record = await this.model.findByIdAndDelete(id);
      if (!record) {
        throw new Error(`Record with ID ${id} not found`);
      }
      return record;
    } catch (error) {
      throw new Error(`Error deleting record: ${error.message}`);
    }
  }
}

export { DatabaseService };
